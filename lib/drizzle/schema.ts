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

//upvotes and downvotes table schema
export const VotesTable = pgTable("upvotes", {
  id: uuid("id").primaryKey().defaultRandom(),
  upVote: boolean("up_vote").default(false),
  downVote: boolean("down_vote").default(false),
  userId: uuid("user_id")
    .notNull()
    .references(() => UserTable.id),
  postId: uuid("post_id")
    .notNull()
    .references(() => TestTable.id),
});

//upvotes and downvotes for comments
export const CommentsVotesTable = pgTable("comment_votes", {
  id: uuid("id").primaryKey().defaultRandom(),
  upVote: boolean("up_vote").default(false),
  downVote: boolean("down_vote").default(false),
  userId: uuid("user_id")
    .notNull()
    .references(() => UserTable.id),
  commentId: uuid("comment_id")
    .notNull()
    .references(() => CommentsTable.id, { onDelete: "cascade" })
    .notNull(),
});

//nested comments votes
export const NestedCommentsVotesTable = pgTable("nested_comment_votes", {
  id: uuid("id").primaryKey().defaultRandom(),
  upVote: boolean("up_vote").default(false),
  downVote: boolean("down_vote").default(false),
  userId: uuid("user_id")
    .notNull()
    .references(() => UserTable.id),
  commentId: uuid("comment_id")
    .notNull()
    .references(() => CommentsTable.id, { onDelete: "cascade" }).notNull(),
  nestedCommentId: uuid("nested_comment_id").notNull(),
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

export const VotesTableRelations = relations(VotesTable, ({ one }) => {
  return {
    user: one(UserTable, {
      fields: [VotesTable.userId],
      references: [UserTable.id],
    }),
    post: one(TestTable, {
      fields: [VotesTable.postId],
      references: [TestTable.id],
    }),
  };
});

export const CommentsVotesTableRelations = relations(
  CommentsVotesTable,
  ({ one }) => {
    return {
      user: one(UserTable, {
        fields: [CommentsVotesTable.userId],
        references: [UserTable.id],
      }),
      comment: one(CommentsTable, {
        fields: [CommentsVotesTable.commentId],
        references: [CommentsTable.id],
      }),
    };
  }
);

export const NestedCommentsVotesTableRelations = relations(
  NestedCommentsVotesTable,
  ({ one }) => {
    return {
      user: one(UserTable, {
        fields: [NestedCommentsVotesTable.userId],
        references: [UserTable.id],
      }),
      comment: one(CommentsTable, {
        fields: [NestedCommentsVotesTable.commentId],
        references: [CommentsTable.id],
      }),
    };
  }
);
