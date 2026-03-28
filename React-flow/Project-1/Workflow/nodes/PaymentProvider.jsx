import { Box, Button, Text } from "@chakra-ui/react";

export default function PaymentProvider({ id, data }) {
  return (
    <Box
      border="1px solid #ccc"
      borderRadius="10px"
      padding="10px"
      bg="white"
    >
      <Text fontWeight="bold">Payment Provider</Text>

      <Text>Provider: {data.provider || "N/A"}</Text>

      {/* ✅ UPDATE BUTTON */}
      <Button
        size="sm"
        colorScheme="blue"
        mt={2}
        onClick={() => data.onUpdate(id)}
      >
        Toggle Provider
      </Button>

      {/* ✅ DELETE BUTTON */}
      <Button
        size="sm"
        colorScheme="red"
        mt={2}
        ml={2}
        onClick={() => data.onDelete(id)}
      >
        Delete
      </Button>
    </Box>
  );
}