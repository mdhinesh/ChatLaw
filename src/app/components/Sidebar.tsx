'use client'

import React, { ReactElement, useEffect } from 'react'
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  BoxProps,
  Button,
  Stack,
  FlexProps,
} from '@chakra-ui/react'
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  FiUser,
  FiPlusCircle
} from 'react-icons/fi'
import { IconType } from 'react-icons'
import { ReactText } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { link } from 'fs'
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios'
import { useState } from 'react'
import { set } from 'mongoose'
import { get } from 'http'

interface LinkItemProps {
  navigatto: string
  name: string
  icon: IconType,
  isLogout: boolean
}

let isUser = false

export default function SimpleSidebar() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [ userData, setUserData ] = useState<{ user: { qa: ReactText[] } } | null>(null)

  const getQandA = async () => {
    try {
        const response = await axios.get('api/users/qa');
        console.log('Login successful', response.data);
        setUserData(response.data);
        toast.success('user data fetched');
    } catch (error: any) {
      toast.error('Not able to process your request, please try again later');
      console.error('Storing qanda failed', error.message);
    }
  };


  useEffect(() => {
    console.log(localStorage.getItem("token"))
    localStorage.getItem("token") ? isUser = true : isUser = false;
  })

  useEffect(() => {
    if(!userData) {
      getQandA()
    }
    console.log(userData?.user?.qa)
  })

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />        
      <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {/* Content */}
      </Box>
    </Box>
  )
}

interface SidebarProps extends BoxProps {
  onClose: () => void
}

const LinkItems: Array<LinkItemProps> = [
  // { name: 'New Chat', icon: FiPlusCircle, navigatto: '', isLogout: false },
  { name: 'Log out', icon: FiUser, navigatto: '/signup', isLogout: true },
  // { name: 'Explore', icon: FiCompass },
  // { name: 'Favourites', icon: FiStar },
  // { name: 'Settings', icon: FiSettings },
]

const Logout = () => {
  localStorage.removeItem("token")
  localStorage.removeItem("username")
  alert("Logout successful")
  console.log("Logout successful")
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {

  return (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          ChatLaw
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
      // <Link key={link.name} href={link.navigatto}>
        <NavItem key={link.name} navigateto={link.navigatto} isLogout={link.isLogout} icon={link.icon}>
            {link.name}
        </NavItem>
      // </Link>
      ))}
    </Box>
  )
}


interface NavItemProps extends FlexProps {
  icon: IconType
  children: ReactElement | ReactText,
  navigateto: string,
  isLogout: boolean
}
const NavItem = ({ icon, children, navigateto, isLogout, ...rest }: NavItemProps) => {
  return (
    <Box
      as="a"
      href={navigateto ? navigateto : undefined}
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
      onClick={isLogout ? Logout : undefined}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
        {...rest}>
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {/* <Link href={navigateto}> */}
          {/* {children} */}
        {/* </Link> */}
          {children}
      </Flex>
    </Box>
  )
}

interface MobileProps extends FlexProps {
  onOpen: () => void
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent="flex-start"
      {...rest}>
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text fontSize="2xl" ml="8" fontFamily="monospace" fontWeight="bold">
        Logo
      </Text>
    </Flex>
  )
}