import "./style.css";
import { createClient } from "@supabase/supabase-js";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? "";
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY ?? "";

export const supabase = createClient(supabaseKey, supabaseUrl);

function CommentBox() {
  const [comment, setComment] = useState("");
  const [userName, setUsername] = useState("");
  const [commentList, setCommentList] = useState([]);

  const { urlFriendlyName } = useParams();

  const onChange = (event) => {
    if (event.target.name === "username") {
      setUsername(event.target.value);
    } else if (event.target.name === "comment") {
      setComment(event.target.value);
    }
  };

  const getCommentList = async () => {
    const { data, error } = await supabase.from("comments").select("*");
    if (!error && data) {
      setCommentList(data);
    } else {
      setCommentList([]);
    }
  };

  useEffect(() => {
    getCommentList();
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();

    const { data, error } = await supabase.from("comments").insert({
      username: userName,
      payload: comment,
      project_name: urlFriendlyName,
    });

    setUsername("");
    setComment("");
    getCommentList();
  };

  return (
    <div>
      <title>Comments Box</title>
      <div>
        <div>
          <h1>Comments</h1>
          <form onSubmit={onSubmit}>
            <input
              onChange={onChange}
              type="text"
              name="username"
              placeholder="Username"
              className="comment-input"
              value={userName}
            />
            <input
              onChange={onChange}
              type="text"
              name="comment"
              placeholder="Add a comment"
              value={comment}
              className="input comment-input"
            />
            <button className="button btn btn-dark">
              Submit
            </button>
            <div className="button btn btn-danger" onClick={getCommentList}>
              Refresh
            </div>

            <div className="comment-section">
              {/* If commentlist.id is equal to the params id, render it */}
              {commentList.map((comment) => {
                if (comment.project_name === urlFriendlyName) {
                  return (
                    <div key={comment.id} className="border rounded-md p-4">
                      <p className="font-semibold mb-2">User: {comment.username}</p>
                      <p className="font-light">Comment: {comment.payload}</p>
                    </div>
                  );
                }
              })}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CommentBox;
