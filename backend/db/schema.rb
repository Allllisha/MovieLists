# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2022_04_07_043455) do
  create_table "bookmarks", charset: "utf8mb3", force: :cascade do |t|
    t.bigint "movie_id", null: false
    t.bigint "list_id", null: false
    t.text "comment", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["list_id"], name: "index_bookmarks_on_list_id"
    t.index ["movie_id"], name: "index_bookmarks_on_movie_id"
  end

  create_table "genres", charset: "utf8mb3", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "list_followers", charset: "utf8mb3", force: :cascade do |t|
    t.bigint "list_id", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["list_id"], name: "index_list_followers_on_list_id"
    t.index ["user_id"], name: "index_list_followers_on_user_id"
  end

  create_table "list_reviews", charset: "utf8mb3", force: :cascade do |t|
    t.bigint "list_id", null: false
    t.bigint "user_id", null: false
    t.text "comment", null: false
    t.integer "rating", default: 0, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["list_id"], name: "index_list_reviews_on_list_id"
    t.index ["user_id"], name: "index_list_reviews_on_user_id"
  end

  create_table "lists", charset: "utf8mb3", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "image_url", null: false
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_lists_on_user_id"
  end

  create_table "movie_genres", charset: "utf8mb3", force: :cascade do |t|
    t.bigint "movie_id", null: false
    t.bigint "genre_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["genre_id"], name: "index_movie_genres_on_genre_id"
    t.index ["movie_id"], name: "index_movie_genres_on_movie_id"
  end

  create_table "movie_reviews", charset: "utf8mb3", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "movie_id", null: false
    t.text "comment", null: false
    t.float "rating", default: 0.0, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["movie_id"], name: "index_movie_reviews_on_movie_id"
    t.index ["user_id"], name: "index_movie_reviews_on_user_id"
  end

  create_table "movies", charset: "utf8mb3", force: :cascade do |t|
    t.string "title", null: false
    t.text "overview", null: false
    t.string "poster_url", null: false
    t.float "rating", default: 0.0, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", charset: "utf8mb3", force: :cascade do |t|
    t.string "first_name", null: false
    t.string "last_name", null: false
    t.string "email", null: false
    t.string "password", null: false
    t.string "photo_url", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "bookmarks", "lists"
  add_foreign_key "bookmarks", "movies"
  add_foreign_key "list_followers", "lists"
  add_foreign_key "list_followers", "users"
  add_foreign_key "list_reviews", "lists"
  add_foreign_key "list_reviews", "users"
  add_foreign_key "lists", "users"
  add_foreign_key "movie_genres", "genres"
  add_foreign_key "movie_genres", "movies"
  add_foreign_key "movie_reviews", "movies"
  add_foreign_key "movie_reviews", "users"
end
