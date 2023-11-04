'use client'

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { use, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'

export default function SimpleCard() {

  const router = useRouter()

  const [isUser, setIsUser] = useState(false)

  const [loading, setLoading] = useState(false)
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [user, setUser] = useState({
      email: '',
      password: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target
      setUser((prevState) => ({
      ...prevState,
      [name]: value,
      }))
  }

  const OnLogin = async () => {
      try {
          setLoading(true)
          const response = await axios.post('api/users/login', user)
          console.log("Login successful", response.data)
          localStorage.setItem("token", response.data.token)
          localStorage.setItem("username", response.data.user.username)
          localStorage.setItem("userId", response.data.user.id)
          router.push("/");
      } catch (error: any) {
          console.log("Login failed", error.message)
      } finally {
          setLoading(false)
      }
  }

  useEffect(() => {
      if(user.email.length > 0 && user.password.length > 0) {
          setButtonDisabled(false);
      } else {
          setButtonDisabled(true);
      }
      console.log(user)
  }, [user])

  useEffect(() => {
    localStorage.getItem("token") ? setIsUser(true) : setIsUser(false);
    isUser ? 
      router.push("/") : 
      router.push("/login");
  }, [isUser, router])


  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>{loading ? "Loading": "Log in✌️"}</Heading>
          {/* <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool <Text color={'blue.400'}>features</Text> ✌️
          </Text> */}
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input name='email' type="email" onChange={handleChange} />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input name='password' type="password" onChange={handleChange} />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                {/* <Checkbox>Remember me</Checkbox> */}
                {/* <Text color={'blue.400'}>Forgot password?</Text> */}
              </Stack>
              <Button
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                onClick={OnLogin}
                >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}