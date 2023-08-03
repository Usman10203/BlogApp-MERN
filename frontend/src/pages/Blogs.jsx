import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true); // Added loading state

    // Function to get blogs
    const getAllBlogs = async () => {
        try {
            const { data } = await axios.get("http://localhost:8080/api/v1/blog/all-blog");
            if (data?.success) {
                setBlogs(data?.blogs);
            }
            setLoading(false); // Set loading to false once data is fetched
        } catch (error) {
            console.log(error);
            setLoading(false); // Set loading to false in case of an error
        }
    };

    useEffect(() => {
        getAllBlogs();
    }, []);

    return (
        <div>
            {loading ? ( // Display the loading indicator while fetching blogs
                <h1>Loading blogs...</h1>
            ) : blogs && blogs.length > 0 ? (
                blogs.slice().reverse().map((blog) => (
                    <BlogCard
                        key={blog?._id} // Make sure to add a unique key prop when mapping
                        id={blog?._id}
                        isUser={localStorage.getItem("userId") === blog?.user?._id}
                        title={blog?.title}
                        description={blog?.description}
                        image={blog?.image}
                        username={blog?.user?.username}
                        time={blog.createdAt}
                    />
                ))
            ) : (
                <h1>Welcome to Blog App</h1>
            )}
        </div>
    );
};

export default Blogs;
