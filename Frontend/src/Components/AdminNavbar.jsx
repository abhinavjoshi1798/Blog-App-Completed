import {
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  IconButton,
  Stack,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { AuthContext } from "../Context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export const AdminNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => setIsOpen(!isOpen);
  const { isAuth, logout, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handellogout = () => {
    logout();
    navigate("/admin/login");
  };
  return (
    <Box
      bgColor={"gray.100"}
      boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
      position={"fixed"}
      top={0}
      left={0}
      width="100%"
      zIndex={1000}
    >
      <Flex
        width={"100%"}
        display={{ base: "flex", md: "none" }}
        h={12}
        justifyContent={"center"}
      >
  <Link to="/admin/dashboard">
       <Badge m="1" ml="2" fontSize="1.5em" colorScheme="yellow">
            Blossom Blogs
          </Badge>
          </Link>
          
      </Flex>
      <Flex
        width={"100%"}
        alignItems={"center"}
        justifyContent={"space-between"}
        h={12}
      >
        <Link to="/admin/dashboard">
        <Badge
          m="1"
          ml="2"
          fontSize="1.5em"
          colorScheme="yellow"
          display={{ base: "none", md: "flex" }}
        >
          Blossom Blogs
        </Badge>
        </Link>
        <Badge
          colorScheme="purple"
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          fontSize={"1.2em"}
          marginLeft={{ base: "10px", md: "none" }}
        >
          {`Welcome Admin ${user.name}`}
        </Badge>
        <HStack>
          <Link to="/admin/createpost">
            <Button
              colorScheme="blue"
              m="1"
              display={{ base: "none", md: "flex" }}
            >
              Create New Post
            </Button>
          </Link>

          <Button
            colorScheme="blue"
            m="1"
            display={{ base: "none", md: "flex" }}
            onClick={handellogout}
          >
            LogOut
          </Button>

          <Box display={{ base: "flex", md: "none" }}>
            <IconButton
              onClick={handleToggle}
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              variant="ghost"
              aria-label="Toggle navigation"
            />
          </Box>
        </HStack>
      </Flex>
      <Flex
        display={{ base: isOpen ? "flex" : "none", md: "none" }}
        flexDirection={"column"}
        paddingBottom={"10px"}
      >
        <Divider borderWidth="3px" marginBottom={"10px"} />

        <Link
          to="/admin/createpost"
          style={{
            width: "137px",
            padding: "0px",
            margin: "5px auto",
          }}
        >
          <Button colorScheme="blue" width={"100%"} onClick={handleToggle}>
            Create Post
          </Button>
        </Link>

        <Button
          colorScheme="blue"
          width={"20%"}
          margin={"auto"}
          onClick={() => {
            handleToggle();
            handellogout();
          }}
        >
          LogOut
        </Button>
      </Flex>
    </Box>
  );
};
