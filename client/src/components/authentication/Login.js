import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useHistory } from "react-router-dom";


const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [show, setShow] = useState(false);
    const [loading,setLoading] = useState(false);
    const toast = useToast();
    const history = useHistory();

    const handleClick = () => {
      setShow(!show);
    };


    const submitHandler = async() => {
      setLoading(true);
      if(!email || !password){
         toast({
           title: "Please Fill all the Fields",
           status: "warning",
           duration: 5000,
           isClosable: true,
           position: "bottom",
         });
         setLoading(false);
         return;
      }

      try {

        const config = {
          headers:{
            "Content-type": "application/json",
          },
        };

        const {data} = await axios.post("api/user/login",{email,password},config)
        toast({
          title: "Login Successful",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        localStorage.setItem("userInfo",JSON.stringify(data));
        setLoading(false);
        history.push("/chats")

      } catch (error) {
        toast({
          title: "Error Occured",
          description:error.response.data.message,
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setLoading(false);
      }
    };


    return (
      <VStack spacing="5px" color="black">
        <FormControl id="Email" isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            // value={email}
            variant="outline"
            color="black"
            placeholder="Enter Your Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              // value={password}
              type={show ? "password" : "text"}
              variant="outline"
              color="black"
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputRightElement width="4.5rem">
              <IconButton
                h="1.75rem"
                size="sm"
                onClick={handleClick}
                icon={show ? <ViewIcon /> : <ViewOffIcon />}
              ></IconButton>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Button
          colorScheme="blue"
          width="100%"
          style={{ marginTop: 15 }}
          onClick={submitHandler}
          isLoading={loading}
        >
          Login
        </Button>
        <Button
          variant="solid"
          colorScheme="red"
          width="100%"
          style={{ marginTop: 15 }}
          onClick={() => {
            setEmail("guest@email.com");
            setPassword("12345");
          }}
        >
          Get Guest User Credentials
        </Button>
      </VStack>
    );
};

export default Login;