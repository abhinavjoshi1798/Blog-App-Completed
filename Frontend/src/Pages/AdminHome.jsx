
import { AdminNavbar } from '../Components/AdminNavbar'
import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Spinner,
  Grid,
  Text,
  Image,
  Heading,
  HStack,
  Stack,
  Button,
  
  Textarea,
} from "@chakra-ui/react";
import { useToast } from '@chakra-ui/react';

import { AuthContext } from "../Context/AuthContext";
import { Link } from 'react-router-dom';

const AdminHome = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [postData, setPostData] = useState([]);
  const [hoveredPostId, setHoveredPostId] = useState(null);
  const [deletePostBtnClik, setDeletePostBtnClik] = useState(false);
  const [deleteCommentBtnClik, setDeleteCommentBtnClik] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const toast = useToast();

  const { isAuth, logout, user, token } = useContext(AuthContext);
  // console.log(isAuth, user);

  const handlePostHover = (postId) => {
    setHoveredPostId(postId);
  };

  const handelDeletePost = () => {
    const post_id=hoveredPostId;  
    setLoading(true)
      // console.log(token);
      fetch(`http://localhost:8080/admin/posts/${post_id}`, {
        method: "delete",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          // console.log("comment created", res);
          setDeletePostBtnClik(!deletePostBtnClik);
          if (res.status === 200) {
            toast({
              title: 'Post Deleted successfully.',
              description: "Post has been deleted successfully.",
              status: 'success',
              duration: 9000,
              isClosable: true,
            });
          }
        })
        .catch((err) => {
          setError(true);
          console.log(err);
        });
    
   
  };

  const handelDeleteComment = (comment_id) => {
    
    setLoading(true)
      // console.log(token);
      fetch(`http://localhost:8080/admin/comment/${comment_id}`, {
        method: "delete",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          // console.log("comment created", res);
          setDeleteCommentBtnClik(!deleteCommentBtnClik);
          if (res.status === 200) {
            toast({
              title: 'Comment Deleted successfully.',
              description: "Comment has been deleted successfully.",
              status: 'success',
              duration: 9000,
              isClosable: true,
            });
          }
        })
        .catch((err) => {
          setError(true);
          console.log(err);
        });
    
   
  };

  useEffect(() => {
    const fetchData = () => {
      fetch(`http://localhost:8080/admin/posts?limit=6&page=${currentPage}`,{
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          setPostData(res.data);
          setTotalPages(res.meta.totalPages);
        })
        .catch((err) => {
          setError(true);
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
          
        });
    };

    const delay = setTimeout(() => {
      fetchData();
    }, 1500);

    return () => clearTimeout(delay);
  }, [deletePostBtnClik,deleteCommentBtnClik,currentPage]);

  const handleNextPage = () => {
    setLoading(true)
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    setLoading(true)
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <AdminNavbar />
      {loading ? (
        <Box
          width={"100%"}
          height={"100vh"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
            margin={"auto"}
          />
        </Box>
      ) : error ? (
        <Box
          width={"100%"}
          height={"100vh"}
          display={"flex"}
          justifyContent={"center"}
          alignContent={"center"}
        >
          <Heading margin={"auto"}>Error... Something went wrong</Heading>
        </Box>
      ) : (
        <Box width={"100%"} minHeight={"100vh"} marginTop={"50px"}>
          <Grid
            templateColumns={{
              base: "1fr",
              sm: "1fr",
              md: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
            }}
            gap={6}
            width={"80%"}
            margin={{ base: "120px auto", md: "80px auto" }}
          >
            <>
              {postData?.map((el) => {
                return (
                  <Box
                    boxShadow={"rgba(0, 0, 0, 0.16) 0px 1px 4px"}
                    borderRadius={"15px"}
                    padding={"5px"}
                    key={el.id}
                    onMouseEnter={() => handlePostHover(el.id)}
                    onMouseLeave={() => setHoveredPostId(null)}
                  >
                    <Image
                      src={el.image}
                      borderRadius={"15px"}
                      margin={"auto"}
                      marginTop={"5px"}
                      marginBottom={"15px"}
                      alt='post logo'
                      maxWidth={"150px"}
                      maxHeight={"150px"}
                    />
                    <Heading
                      as="h3"
                      size="md"
                      textAlign={"center"}
                      marginBottom={"10px"}
                      fontWeight={"600"}
                    >
                      {el.title}
                    </Heading>
                    <Box p={3} pt={0}>
                      <Text>{el.description}</Text>
                    </Box>
                    <HStack margin={"auto"} justifyContent={"space-around"}>
                    <Link to={`/admin/${el.id}`} >  <Button colorScheme='blue'>Edit</Button> </Link>
                      <Button colorScheme='red' onClick={handelDeletePost}>Delete</Button>
                    </HStack>
                    <Box p={3}>
                      <Text color={"blue.400"}>Comments:</Text>
                      {el.comment?.length === 0 ? (
                        <Text>No Comments</Text>
                      ) : (
                        <>
                          {el.comment?.map((comment) => {
                            return (
                              <Stack key={comment.id} boxShadow={"rgba(0, 0, 0, 0.16) 0px 1px 4px"}
                              p={2} m={2} borderRadius={"10px"}>
                                <HStack alignItems={"top"} justifyContent={"space-between"} >
                                  <Text>
                                    {comment.user.name}
                                    {":"}
                                  </Text>
                                  <Text>{comment.comment}</Text>
                                  
                                </HStack>
                                <Button colorScheme='red' width={"40%"} margin={"auto"} onClick={()=>handelDeleteComment(comment.id)}>Delete</Button>
                              </Stack>
                            );
                          })}
                        </>
                      )}
                    </Box>
                   
                  </Box>
                );
              })}
            </>
          </Grid>
          
          <HStack width={"40%"} justifyContent={"center"} margin={"auto"}>
          <Button
              onClick={handlePreviousPage}
              isDisabled={currentPage === 1}
              colorScheme="blue"
            >
              Previous Page
            </Button>
            <Button>{currentPage}</Button>
            <Button
              onClick={handleNextPage}
              isDisabled={currentPage === totalPages}
              colorScheme="blue"
            >
              Next Page
            </Button>
          </HStack>

          <Box width={"100%"} height={"50px"} marginTop={"50px"}
          backgroundColor={"gray.100"}></Box>
          
        </Box>
        
      )}
    </div>
  )
}

export default AdminHome
