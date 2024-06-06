import { relations } from "drizzle-orm";
import {
  boolean,
  date,
  integer,
  jsonb,
  pgTable,
  text,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const UserTable = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: varchar("email", { length: 255 }).unique().notNull(),
  password: varchar("password", { length: 244 }).notNull(),
  name: text("name").notNull().default(""),
  userName: text("user_name").notNull().default(""),
});

export const TestTable = pgTable("tests", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  duration: integer("duration").default(0),
  description: text("description").notNull(),
  tags: text("tags").notNull().default(""),
  ownTest: boolean("own_test").default(false),
  privatePost: boolean("private_post").default(false),
  questions: jsonb("questions").default([]).array(),
  userId: uuid("user_id")
    .notNull()
    .references(() => UserTable.id),
});

export const TestsTakenTable = pgTable("tests_taken", {
  id: uuid("id").primaryKey().defaultRandom(),
  testId: uuid("test_id")
    .notNull()
    .references(() => TestTable.id),
  userId: uuid("user_id")
    .notNull()
    .references(() => UserTable.id),
  answers: jsonb("answers").default([]).array(),
  duration: integer("duration").default(0),
});

export const CommentsTable = pgTable("comments", {
  id: uuid("id").primaryKey().defaultRandom(),
  message: text("message").notNull(),
  createdAt: date("created_at").defaultNow(),
  userId: uuid("user_id")
    .notNull()
    .references(() => UserTable.id),
  postId: uuid("post_id")
    .notNull()
    .references(() => TestTable.id),
  nestedComments: jsonb("children_comments").default([]).array(),
});

//Relations

export const UserTableRelations = relations(UserTable, ({ many }) => {
  return {
    tests: many(TestTable),
  };
});

export const TestTableRelations = relations(TestTable, ({ one }) => {
  return {
    user: one(UserTable, {
      fields: [TestTable.userId],
      references: [UserTable.id],
    }),
  };
});

export const TestsTakenTableRelations = relations(
  TestsTakenTable,
  ({ one }) => {
    return {
      test: one(TestTable, {
        fields: [TestsTakenTable.testId],
        references: [TestTable.id],
      }),
      user: one(UserTable, {
        fields: [TestsTakenTable.userId],
        references: [UserTable.id],
      }),
    };
  }
);

export const CommentsTableRelations = relations(CommentsTable, ({ one }) => {
  return {
    user: one(UserTable, {
      fields: [CommentsTable.userId],
      references: [UserTable.id],
    }),
    comment: one(TestTable, {
      fields: [CommentsTable.postId],
      references: [TestTable.id],
    }),
  };
});
