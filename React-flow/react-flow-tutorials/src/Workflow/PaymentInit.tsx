import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { Handle, NodeProps, Position } from "reactflow";
import CustomHandle from "./CustomHandle";

export default function PaymentInit({
  data: { amount }, data: { variant },
}: NodeProps<{ amount: number; variant: string }>) 

{
  if(variant === "second") {
    return (
      <Box bg="white" border="1px solid #aa1fff">
        <Box bg="#410566" p={1}>
          <Text fontSize="small" color="white">
            Payment Initialzed - Second Variant
          </Text>
        </Box>
        <Box p={2}>
          <Text fontSize="2xl" color="blue.600">
            ${amount} - Second Variant
          </Text>
        </Box>
        <CustomHandle type="source" position={Position.Right} />
      </Box>
    );
  }
  return (
    <Box bg="white" border="1px solid #aa1fff">
      <Box bg="#410566" p={1}>
        <Text fontSize="small" color="white">
          Payment Initialzed
        </Text>
      </Box>
      <Box p={2}>
        <Text fontSize="2xl" color="blue.600">
          ${amount}
        </Text>
      </Box>
      <CustomHandle type="source" position={Position.Right} />
    </Box>
  );
}
