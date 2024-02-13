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
import { Navbar } from "../Components/Navbar";
import { AuthContext } from "../Context/AuthContext";


const Home = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [postData, setPostData] = useState([]);
  const [hoveredPostId, setHoveredPostId] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [newCommentBtnClik, setNewCommentBtnClik] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const { isAuth, logout, user, token } = useContext(AuthContext);
  // console.log(isAuth, user);

  const handlePostHover = (postId) => {
    setHoveredPostId(postId);
  };

  const handelCommentClick = () => {
    if(newComment){
      const data = {
        post_id: Number(hoveredPostId),
        comment: newComment,
        user_id: Number(user.id),
      };
      setLoading(true)
      // console.log(token);
      fetch("http://localhost:8080/user/createcomment", {
        method: "post",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          // console.log("comment created", res);
          setNewCommentBtnClik(!newCommentBtnClik);
          
        })
        .catch((err) => {
          setError(true);
          console.log(err);
        });
    }
   
  };

  useEffect(() => {
    const fetchData = () => {
      fetch(`http://localhost:8080/user/posts?limit=6&page=${currentPage}`)
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
          setNewComment("")
        });
    };

    const delay = setTimeout(() => {
      fetchData();
    }, 1500);

    return () => clearTimeout(delay);
  }, [newCommentBtnClik,currentPage]);

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
      <Navbar />
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
                    <Box p={3}>
                      <Text color={"blue.500"}>Comments:</Text>
                      {el.comment?.length === 0 ? (
                        <Text>No Comments</Text>
                      ) : (
                        <>
                          {el.comment?.map((comment) => {
                            return (
                              <Stack key={comment.id} boxShadow={"rgba(0, 0, 0, 0.16) 0px 1px 4px"}
                               m={2} borderRadius={"10px"} >
                                <HStack alignItems={"top"} width={"100%"} height={"100%"} p={2} justifyContent={"space-around"} >
                                  <Text>
                                    {comment.user.name}
                                    {":"}
                                  </Text>
                                  <Text>{comment.comment}</Text>
                                </HStack>
                              </Stack>
                            );
                          })}
                        </>
                      )}
                    </Box>
                    {isAuth ? (
                      <Stack>
                        <Textarea
                          type="text"
                          onChange={(e) => setNewComment(e.target.value)}
                          
                        />
                        <Button
                          colorScheme="blue"
                          width={"50%"}
                          onClick={handelCommentClick}
                          margin={"auto"}
                        >
                          Comment
                        </Button>
                      </Stack>
                    ) : (
                      ""
                    )}
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
  );
};

export default Home;

