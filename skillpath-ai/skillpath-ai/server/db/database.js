// server/db/database.js
// Resilient MongoDB/Mongoose-compatible Document Store with Disk Persistence & Seed Engine

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {
  INITIAL_CAREERS,
  INITIAL_SKILLS,
  DEMO_STUDENT,
  INITIAL_ASSESSMENTS,
  INITIAL_MISSIONS,
  INITIAL_RESOURCES
} from "./seedData.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE_PATH = path.resolve(__dirname, "../../data/db.json");

class Collection {
  constructor(name, getStore, saveStore) {
    this.name = name;
    this.getStore = getStore;
    this.saveStore = saveStore;
  }

  _getItems() {
    const store = this.getStore();
    if (!store[this.name]) {
      store[this.name] = [];
    }
    return store[this.name];
  }

  find(filter = {}) {
    const items = this._getItems();
    if (!filter || Object.keys(filter).length === 0) {
      return [...items];
    }
    return items.filter(item => {
      return Object.entries(filter).every(([key, val]) => {
        if (typeof val === "object" && val !== null) {
          if (val.$in && Array.isArray(val.$in)) {
            return val.$in.includes(item[key]);
          }
        }
        return item[key] === val;
      });
    });
  }

  findOne(filter = {}) {
    const items = this._getItems();
    return items.find(item => {
      return Object.entries(filter).every(([key, val]) => {
        return item[key] === val;
      });
    }) || null;
  }

  findById(id) {
    const items = this._getItems();
    return items.find(item => item.id === id || item._id === id) || null;
  }

  insertOne(doc) {
    const items = this._getItems();
    const newDoc = {
      id: doc.id || doc._id || `${this.name.slice(0, 3)}-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...doc
    };
    items.push(newDoc);
    this.saveStore();
    return newDoc;
  }

  create(doc) {
    return this.insertOne(doc);
  }

  updateOne(filter, updateData) {
    const items = this._getItems();
    const index = items.findIndex(item => {
      return Object.entries(filter).every(([key, val]) => item[key] === val);
    });

    if (index === -1) return null;

    const existing = items[index];
    const updates = updateData.$set ? updateData.$set : updateData;
    const updated = {
      ...existing,
      ...updates,
      updatedAt: new Date().toISOString()
    };

    items[index] = updated;
    this.saveStore();
    return updated;
  }

  findByIdAndUpdate(id, updateData) {
    return this.updateOne({ id }, updateData);
  }

  deleteOne(filter) {
    const items = this._getItems();
    const index = items.findIndex(item => {
      return Object.entries(filter).every(([key, val]) => item[key] === val);
    });

    if (index === -1) return false;
    items.splice(index, 1);
    this.saveStore();
    return true;
  }

  count(filter = {}) {
    return this.find(filter).length;
  }
}

class DatabaseManager {
  constructor() {
    this.store = {};
    this.collections = {};
    this.isLoaded = false;
    this.init();
  }

  init() {
    this.loadFromDisk();
    this.seedDefaults();
  }

  loadFromDisk() {
    try {
      if (fs.existsSync(DB_FILE_PATH)) {
        const raw = fs.readFileSync(DB_FILE_PATH, "utf-8");
        this.store = JSON.parse(raw);
      } else {
        this.store = {};
      }
    } catch (err) {
      console.warn("[DB] Warning: could not parse db.json, initializing fresh store:", err.message);
      this.store = {};
    }
    this.isLoaded = true;
  }

  saveToDisk() {
    try {
      const dir = path.dirname(DB_FILE_PATH);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(DB_FILE_PATH, JSON.stringify(this.store, null, 2), "utf-8");
    } catch (err) {
      console.error("[DB] Error saving database to disk:", err);
    }
  }

  collection(name) {
    if (!this.collections[name]) {
      this.collections[name] = new Collection(
        name,
        () => this.store,
        () => this.saveToDisk()
      );
    }
    return this.collections[name];
  }

  seedDefaults() {
    const careers = this.collection("career_roles");
    if (careers.count() === 0) {
      INITIAL_CAREERS.forEach(c => careers.insertOne(c));
      console.log(`[DB Seed] Loaded ${INITIAL_CAREERS.length} Career Roles.`);
    }

    const skills = this.collection("skills");
    if (skills.count() === 0) {
      INITIAL_SKILLS.forEach(s => skills.insertOne(s));
      console.log(`[DB Seed] Loaded ${INITIAL_SKILLS.length} Skills.`);
    }

    const students = this.collection("student_profiles");
    if (students.count() === 0) {
      students.insertOne(DEMO_STUDENT);
      console.log(`[DB Seed] Seeded Default Learner Profile: ${DEMO_STUDENT.fullName}`);
    }

    const assessments = this.collection("assessments");
    if (assessments.count() === 0) {
      INITIAL_ASSESSMENTS.forEach(a => assessments.insertOne(a));
      console.log(`[DB Seed] Loaded ${INITIAL_ASSESSMENTS.length} Assessments.`);
    }

    const missions = this.collection("projects");
    if (missions.count() === 0) {
      INITIAL_MISSIONS.forEach(m => missions.insertOne(m));
      console.log(`[DB Seed] Loaded ${INITIAL_MISSIONS.length} Project Lab Missions.`);
    }

    const resources = this.collection("learning_resources");
    if (resources.count() === 0) {
      INITIAL_RESOURCES.forEach(r => resources.insertOne(r));
      console.log(`[DB Seed] Loaded ${INITIAL_RESOURCES.length} Learning Resources.`);
    }

    // Default User account for Demo Alex
    const users = this.collection("users");
    if (users.count() === 0) {
      users.insertOne({
        id: "user-alex",
        email: "alex@skillpath.ai",
        passwordHash: "demo_hash_alex_2026",
        name: "Alex Rivera",
        role: "student",
        createdAt: new Date().toISOString()
      });
      console.log("[DB Seed] Created Demo User Account (alex@skillpath.ai)");
    }
  }
}

export const db = new DatabaseManager();

// Mongoose-style convenience model handles
export const User = db.collection("users");
export const StudentProfile = db.collection("student_profiles");
export const Skill = db.collection("skills");
export const CareerRole = db.collection("career_roles");
export const SkillRequirement = db.collection("skill_requirements");
export const LearningRoadmap = db.collection("learning_roadmaps");
export const LearningResource = db.collection("learning_resources");
export const Assessment = db.collection("assessments");
export const AssessmentResult = db.collection("assessment_results");
export const Project = db.collection("projects");
export const ProjectEvaluation = db.collection("project_evaluations");
export const ProgressHistory = db.collection("progress_history");
export const AgentActivityLog = db.collection("agent_activity_logs");
