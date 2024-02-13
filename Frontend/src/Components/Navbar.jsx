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
import { Link } from "react-router-dom";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => setIsOpen(!isOpen);
  const { isAuth, logout, user } = useContext(AuthContext);
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
        <Badge m="1" ml="2" fontSize="1.5em" colorScheme="yellow">
          Blossom Blogs
        </Badge>
      </Flex>
      <Flex
        width={"100%"}
        alignItems={"center"}
        justifyContent={"space-between"}
        h={12}
      >
        <Badge
          m="1"
          ml="2"
          fontSize="1.5em"
          colorScheme="yellow"
          display={{ base: "none", md: "flex" }}
        >
          Blossom Blogs
        </Badge>

        <Badge
          colorScheme="purple"
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          fontSize={"1.2em"}
          marginLeft={{base:"10px",md:"none"}}
        >
          {isAuth ? `Welcome ${user.name}` : "Welcome...! Please Login"}
        </Badge>
        <HStack>
          {isAuth ? (
            <Button
              colorScheme="blue"
              m="1"
              display={{ base: "none", md: "flex" }}
              onClick={logout}
            >
              LogOut
            </Button>
          ) : (
            <>
              <Link to="/login">
                <Button
                  colorScheme="blue"
                  m="1"
                  display={{ base: "none", md: "flex" }}
                >
                  LogIn
                </Button>
              </Link>
              <Link to="/signup">
                <Button
                  colorScheme="blue"
                  m="1"
                  display={{ base: "none", md: "flex" }}
                >
                  SignUp
                </Button>
              </Link>
            </>
          )}

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

        {isAuth ? (
          <Button
            colorScheme="blue"
            width={"20%"}
            margin={"auto"}
            onClick={()=>{handleToggle();logout();}}
          >
            LogOut
          </Button>
        ) : (
          <Stack>
            <Link
              to="/login"
              style={{
                width: "137px",
                padding: "0px",
                margin: "auto",
              }}
            >
              <Button colorScheme="blue" width={"100%"} onClick={handleToggle}>
                LogIn
              </Button>
            </Link>
            <Link
              to="/signup"
              style={{
                width: "137px",
                padding: "0px",
                margin: "auto",
              }}
            >
              <Button colorScheme="blue" width={"100%"} onClick={handleToggle}>
                SignUp
              </Button>
            </Link>
          </Stack>
        )}
      </Flex>
    </Box>
  );
};
