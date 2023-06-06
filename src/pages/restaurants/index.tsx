import { useState } from 'react';
import AppLayout from 'layout/app-layout';
import NextLink from 'next/link';
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Box, Text, Button, Link } from '@chakra-ui/react';
import useSWR from 'swr';
import { Spinner } from '@chakra-ui/react';
import { getRestaurants, deleteRestaurantById } from 'apiSdk/restaurants';
import { RestaurantInterface } from 'interfaces/restaurant';
import { Error } from 'components/error';
import { AccessOperationEnum, AccessServiceEnum, useAuthorizationApi, withAuthorization } from '@roq/nextjs';

function RestaurantListPage() {
  const { hasAccess } = useAuthorizationApi();
  const { data, error, isLoading, mutate } = useSWR<RestaurantInterface[]>(
    () => '/restaurants',
    () =>
      getRestaurants({
        relations: ['user', 'inventory.count', 'menu_item.count', 'order.count', 'review.count', 'schedule.count'],
      }),
  );

  const [deleteError, setDeleteError] = useState(null);

  const handleDelete = async (id: string) => {
    setDeleteError(null);
    try {
      await deleteRestaurantById(id);
      await mutate();
    } catch (error) {
      setDeleteError(error);
    }
  };

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Restaurant
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {hasAccess('restaurant', AccessOperationEnum.CREATE, AccessServiceEnum.PROJECT) && (
          <Link href={`/restaurants/create`}>
            <Button colorScheme="blue" mr="4">
              Create
            </Button>
          </Link>
        )}
        {error && <Error error={error} />}
        {deleteError && <Error error={deleteError} />}
        {isLoading ? (
          <Spinner />
        ) : (
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>name</Th>
                  {hasAccess('user', AccessOperationEnum.READ, AccessServiceEnum.PROJECT) && <Th>user</Th>}
                  {hasAccess('inventory', AccessOperationEnum.READ, AccessServiceEnum.PROJECT) && <Th>inventory</Th>}
                  {hasAccess('menu_item', AccessOperationEnum.READ, AccessServiceEnum.PROJECT) && <Th>menu_item</Th>}
                  {hasAccess('order', AccessOperationEnum.READ, AccessServiceEnum.PROJECT) && <Th>order</Th>}
                  {hasAccess('review', AccessOperationEnum.READ, AccessServiceEnum.PROJECT) && <Th>review</Th>}
                  {hasAccess('schedule', AccessOperationEnum.READ, AccessServiceEnum.PROJECT) && <Th>schedule</Th>}
                  {hasAccess('restaurant', AccessOperationEnum.UPDATE, AccessServiceEnum.PROJECT) && <Th>Edit</Th>}
                  {hasAccess('restaurant', AccessOperationEnum.READ, AccessServiceEnum.PROJECT) && <Th>View</Th>}
                  {hasAccess('restaurant', AccessOperationEnum.DELETE, AccessServiceEnum.PROJECT) && <Th>Delete</Th>}
                </Tr>
              </Thead>
              <Tbody>
                {data?.map((record) => (
                  <Tr key={record.id}>
                    <Td>{record.name}</Td>
                    {hasAccess('user', AccessOperationEnum.READ, AccessServiceEnum.PROJECT) && (
                      <Td>
                        <Link as={NextLink} href={`/users/view/${record.user?.id}`}>
                          {record.user?.email}
                        </Link>
                      </Td>
                    )}
                    {hasAccess('inventory', AccessOperationEnum.READ, AccessServiceEnum.PROJECT) && (
                      <Td>{record?._count?.inventory}</Td>
                    )}
                    {hasAccess('menu_item', AccessOperationEnum.READ, AccessServiceEnum.PROJECT) && (
                      <Td>{record?._count?.menu_item}</Td>
                    )}
                    {hasAccess('order', AccessOperationEnum.READ, AccessServiceEnum.PROJECT) && (
                      <Td>{record?._count?.order}</Td>
                    )}
                    {hasAccess('review', AccessOperationEnum.READ, AccessServiceEnum.PROJECT) && (
                      <Td>{record?._count?.review}</Td>
                    )}
                    {hasAccess('schedule', AccessOperationEnum.READ, AccessServiceEnum.PROJECT) && (
                      <Td>{record?._count?.schedule}</Td>
                    )}
                    {hasAccess('restaurant', AccessOperationEnum.UPDATE, AccessServiceEnum.PROJECT) && (
                      <Td>
                        <NextLink href={`/restaurants/edit/${record.id}`} passHref legacyBehavior>
                          <Button as="a">Edit</Button>
                        </NextLink>
                      </Td>
                    )}
                    {hasAccess('restaurant', AccessOperationEnum.READ, AccessServiceEnum.PROJECT) && (
                      <Td>
                        <NextLink href={`/restaurants/view/${record.id}`} passHref legacyBehavior>
                          <Button as="a">View</Button>
                        </NextLink>
                      </Td>
                    )}
                    {hasAccess('restaurant', AccessOperationEnum.DELETE, AccessServiceEnum.PROJECT) && (
                      <Td>
                        <Button onClick={() => handleDelete(record.id)}>Delete</Button>
                      </Td>
                    )}
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </AppLayout>
  );
}
export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'restaurant',
  operation: AccessOperationEnum.READ,
})(RestaurantListPage);
