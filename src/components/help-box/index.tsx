import React from 'react';
import {
  Box,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Text,
  UnorderedList,
  ListItem,
  Link,
} from '@chakra-ui/react';
import { FiInfo } from 'react-icons/fi';
import { useSession } from '@roq/nextjs';

export const HelpBox: React.FC = () => {
  const ownerRoles = ['Restaurant Owner'];
  const roles = ['Restaurant Owner', 'Restaurant Manager', 'Chef', 'Admin', 'Customer'];
  const applicationName = 'RestoMax';
  const tenantName = 'Restaurant';
  const githubUrl = process.env.NEXT_PUBLIC_GITHUB_URL;
  const userStories = `Role: Restaurant Owner

1. As a restaurant owner, I want to be able to create and manage my restaurant's profile on the platform, so that I can showcase my restaurant's offerings and attract more customers.

2. As a restaurant owner, I want to be able to view and analyze sales and inventory reports, so that I can make informed decisions about my restaurant's operations and growth.

3. As a restaurant owner, I want to be able to manage my staff's schedules and roles within the platform, so that I can ensure smooth operations and efficient staffing.

4. As a restaurant owner, I want to be able to receive notifications about low inventory levels, so that I can take action to replenish stock and avoid running out of essential items.

5. As a restaurant owner, I want to be able to view and respond to customer feedback and reviews, so that I can maintain a high level of customer satisfaction and address any issues that arise.

Role: Restaurant Manager

1. As a restaurant manager, I want to be able to manage incoming orders from customers, so that I can ensure timely and accurate order fulfillment.

2. As a restaurant manager, I want to be able to view and update inventory levels, so that I can keep track of stock and ensure that we have enough ingredients to fulfill orders.

3. As a restaurant manager, I want to be able to create and manage staff schedules, so that I can ensure that the restaurant is adequately staffed at all times.

4. As a restaurant manager, I want to be able to view sales and performance reports, so that I can identify areas for improvement and make data-driven decisions.

Role: Chef

1. As a chef, I want to be able to view incoming orders in real-time, so that I can prepare and fulfill orders efficiently.

2. As a chef, I want to be able to update the status of orders as they are being prepared and completed, so that the front-of-house staff and customers are kept informed about the progress of their orders.

3. As a chef, I want to be able to view and manage inventory levels for ingredients, so that I can ensure that I have enough stock to fulfill orders and avoid running out of essential items.

Role: Admin

1. As an admin, I want to be able to manage user accounts and permissions for the restaurant management platform, so that I can ensure that only authorized users have access to the system.

2. As an admin, I want to be able to configure and customize the platform to suit the specific needs of my restaurant, so that the system is tailored to our unique requirements.

3. As an admin, I want to be able to provide technical support and assistance to other users of the platform, so that I can help resolve any issues that arise and ensure a smooth user experience.

Role: Customer

1. As a customer, I want to be able to browse the menu and place orders through the platform, so that I can enjoy a seamless and convenient dining experience.

2. As a customer, I want to be able to view the status of my order in real-time, so that I know when to expect my food and can plan accordingly.

3. As a customer, I want to be able to provide feedback and reviews about my dining experience, so that I can share my thoughts with the restaurant and help them improve their service.`;

  const { session } = useSession();
  if (!process.env.NEXT_PUBLIC_SHOW_BRIEFING || process.env.NEXT_PUBLIC_SHOW_BRIEFING === 'false') {
    return null;
  }
  return (
    <Box width={1} position="fixed" left="20px" bottom="20px" zIndex={3}>
      <Popover placement="top">
        <PopoverTrigger>
          <IconButton
            aria-label="Help Info"
            icon={<FiInfo />}
            bg="blue.800"
            color="white"
            _hover={{ bg: 'blue.800' }}
            _active={{ bg: 'blue.800' }}
            _focus={{ bg: 'blue.800' }}
          />
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>App Briefing</PopoverHeader>
          <PopoverBody maxH="400px" overflowY="auto">
            <Text mb="2">Hi there!</Text>
            <Text mb="2">
              Welcome to {applicationName}, your freshly generated B2B SaaS application. This in-app briefing will guide
              you through your application. Feel free to remove this tutorial with the{' '}
              <Box as="span" bg="yellow.300" p={1}>
                NEXT_PUBLIC_SHOW_BRIEFING
              </Box>{' '}
              environment variable.
            </Text>
            <Text mb="2">You can use {applicationName} with one of these roles:</Text>
            <UnorderedList mb="2">
              {roles.map((role) => (
                <ListItem key={role}>{role}</ListItem>
              ))}
            </UnorderedList>
            {session?.roqUserId ? (
              <Text mb="2">You are currently logged in as a {session?.user?.roles?.join(', ')}.</Text>
            ) : (
              <Text mb="2">
                Right now, you are not logged in. The best way to start your journey is by signing up as{' '}
                {ownerRoles.join(', ')} and to create your first {tenantName}.
              </Text>
            )}
            <Text mb="2">
              {applicationName} was generated based on these user stories. Feel free to try them out yourself!
            </Text>
            <Box mb="2" whiteSpace="pre-wrap">
              {userStories}
            </Box>
            <Text mb="2">
              If you are happy with the results, then you can get the entire source code here:{' '}
              <Link href={githubUrl} color="cyan.500" isExternal>
                {githubUrl}
              </Link>
            </Text>
            <Text mb="2">
              Console Dashboard: For configuration and customization options, access our console dashboard. Your project
              has already been created and is waiting for your input. Check your emails for the invite.
            </Text>
            <Text mb="2">
              <Link href="https://console.roq.tech" color="cyan.500" isExternal>
                ROQ Console
              </Link>
            </Text>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
};
