import { Link as RouterLink, Outlet, useLocation } from 'react-router-dom';
import {
  Box,
  Flex,
  VStack,
  Heading,
  Text,
  Link,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  IconButton,
  Image,
} from '@chakra-ui/react';
import {
  FaHome,
  FaCoffee,
  FaBootstrap,
  FaStethoscope,
  FaBabyCarriage,
  FaSignOutAlt,
} from 'react-icons/fa';
import { IoIosMenu } from "react-icons/io";
import logo from '/milky-farm.png';

const SidebarContent = ({ onClose }) => {
  const location = useLocation();

  const NavItem = ({ icon, children, to }) => (
    <Link
      as={RouterLink}
      to={to}
      display='flex'
      alignItems='center'
      p={2}
      rounded='md'
      bg={location.pathname === to ? 'blue.500' : 'transparent'}
      color={location.pathname === to ? 'white' : 'inherit'}
      _hover={{ textDecoration: 'none', bg: 'blue.500', color: 'white' }}
      onClick={onClose}
    >
      <Box as={icon} mr={3} />
      {children}
    </Link>
  );

  return (
    <VStack align='stretch' spacing={4}>
      <NavItem to='/' icon={FaHome}>
        Dashboard
      </NavItem>
      <NavItem to='/cows' icon={FaCoffee}>
        Cows
      </NavItem>
      <NavItem to='/milk-production' icon={FaBootstrap}>
        Milk Production
      </NavItem>
      <NavItem to='/medical-checkups' icon={FaStethoscope}>
        Medical Checkups
      </NavItem>
      <NavItem to='/births' icon={FaBabyCarriage}>
        Births
      </NavItem>
    </VStack>
  );
};

const Layout = ({ user, onLogout }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH='100vh'>
      <Flex>
        {/* Sidebar for larger screens */}
        <Box
          w='250px'
          bg='gray.100'
          h='100vh'
          overflow='auto'
          display={{ base: 'none', md: 'block' }}
        >
          <VStack align='stretch' p={5} spacing={8}>
            <Flex gap={2}>
              <Image src={logo} alt='Milky Farm' h={6} />
              <Heading display='flex' size='md'>
                Milky Farm
              </Heading>
            </Flex>
            <SidebarContent />
          </VStack>
        </Box>

        {/* Main content area */}
        <Box flex={1}>
          {/* Header */}
          <Flex
            bg='white'
            px={4}
            py={3}
            justifyContent='space-between'
            alignItems='center'
            borderBottomWidth={1}
          >
            <Flex alignItems='center'>
              <IconButton
                icon={<IoIosMenu fontSize={25} />}
                onClick={onOpen}
                display={{ base: 'flex', md: 'none' }}
                justifyContent='center'
                variant='outline'
                mr={2}
              />
            </Flex>
            <Flex alignItems='center'>
              <Text mr={4}>{user.name}</Text>
              <IconButton
                icon={<FaSignOutAlt />}
                colorScheme='red'
                h='auto'
                py={2.5}
                onClick={onLogout}
              />
            </Flex>
          </Flex>

          {/* Page content */}
          <Box p={8}>
            <Outlet />
          </Box>
        </Box>
      </Flex>

      {/* Mobile sidebar drawer */}
      <Drawer isOpen={isOpen} placement='left' onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>
              <Flex gap={2}>
                <Image src={logo} alt='Milky Farm' h={6} />
                <Heading display='flex' size='md'>
                  Milky Farm
                </Heading>
              </Flex>
            </DrawerHeader>
            <DrawerBody>
              <SidebarContent onClose={onClose} />
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </Box>
  );
};

export default Layout;
