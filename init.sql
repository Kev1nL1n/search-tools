PRAGMA foreign_keys = false;

-- ----------------------------
-- Table structure for t_link
-- ----------------------------
DROP TABLE IF EXISTS "t_link";
CREATE TABLE "t_link" (
  "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  "result_id" integer,
  "content" text NOT NULL,
  "status" integer NOT NULL DEFAULT 0
);

-- ----------------------------
-- Table structure for t_link_data
-- ----------------------------
DROP TABLE IF EXISTS "t_link_data";
CREATE TABLE "t_link_data" (
  "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  "result_id" integer NOT NULL,
  "link_id" integer NOT NULL,
  "type" integer,
  "content" text
);

-- ----------------------------
-- Table structure for t_result
-- ----------------------------
DROP TABLE IF EXISTS "t_result";
CREATE TABLE "t_result" (
  "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  "eng_id" text,
  "eng_name" text,
  "title" text,
  "href" text NOT NULL,
  "status" integer NOT NULL DEFAULT 0
);

-- ----------------------------
-- Indexes structure for table t_link
-- ----------------------------
CREATE INDEX "t_link_result_id_index"
ON "t_link" (
  "result_id" ASC
);

PRAGMA foreign_keys = true;
