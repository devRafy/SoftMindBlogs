import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Modal, ModalBody, Table, TableCell } from "flowbite-react";
import { Link } from "react-router-dom";
import { MdOutlineErrorOutline } from "react-icons/md";
import axios from "axios";

const DashPosts = () => {
  const { currentUser } = useSelector((state) => state.reducer.user);
  const [userPost, setUserPost] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModel, setShowModel] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(
          `/auth/post/getposts?userId=${currentUser.rest._id}`
        );
        setUserPost(res.data.posts);
        setIsLoading(false);
      } catch (e) {
        console.error(e);
        setError("Failed to fetch posts.");
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, [currentUser.rest._id]);

  const handleDeletePost = async () => {
    setShowModel(false);
    try {
      await axios.delete(
        `/auth/post/deletepost/${postIdToDelete}/${currentUser.rest._id}`
      );
      setUserPost((prevState) =>
        prevState.filter((post) => post._id !== postIdToDelete)
      );
    } catch (e) {
      console.error(e);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="table-auto md:mx-auto p-3">
      {userPost.length > 0 ? (
        <Table hoverable className="shadow-md">
          <Table.Head>
            <Table.HeadCell>Date Updated</Table.HeadCell>
            <Table.HeadCell>Post Image</Table.HeadCell>
            <Table.HeadCell>Post Title</Table.HeadCell>
            <Table.HeadCell>Category</Table.HeadCell>
            <Table.HeadCell>Author</Table.HeadCell>
            <Table.HeadCell>Delete</Table.HeadCell>
            <Table.HeadCell>Edit</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {userPost.map((post) => (
              <Table.Row key={post._id}>
                <TableCell>
                  {new Date(post.updatedAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Link to={`/post/${post.slug}`}>
                    <img
                      src={
                        post?.postImage
                          ? `http://localhost:5000${post.postImage}`
                          : "/placeholder-image.png"
                      }
                      alt="Post"
                      className="w-20 h-10 object-cover rounded-lg bg-gray-500"
                    />
                  </Link>
                </TableCell>

                <TableCell>
                  <Link
                    to={`/post/${post.slug}`}
                    className="font-medium text-gray-900 dark:text-white"
                  >
                    {post.title}
                  </Link>
                </TableCell>
                <TableCell>{post.category}</TableCell>
                <TableCell>{post.author}</TableCell>
                <TableCell>
                  <span
                    className="font-medium text-red-500 hover:underline cursor-pointer"
                    onClick={() => {
                      setShowModel(true);
                      setPostIdToDelete(post._id);
                    }}
                  >
                    Delete
                  </span>
                </TableCell>
                <TableCell>
                  <Link
                    to={`/update-post/${post._id}`}
                    className="text-teal-500 hover:underline"
                  >
                    Edit
                  </Link>
                </TableCell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      ) : (
        <div>You have no posts yet!</div>
      )}

      <Modal
        show={showModel}
        onClose={() => setShowModel(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <ModalBody>
          <div className="text-center">
            <MdOutlineErrorOutline className="h-14 w-14 text-gray-500 mx-auto" />
          </div>
          <h3 className="text-lg text-gray-700 mt-4">
            Are you sure you want to delete this Post?
          </h3>
          <div className="flex justify-between mt-4 ">
            <Button color="failure" onClick={handleDeletePost}>
              Yes, I'm Sure
            </Button>
            <Button className="bg-green-500" onClick={() => setShowModel(false)}>Cancel</Button>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default DashPosts;
