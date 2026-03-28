import { useRef, useCallback } from "react";
import PaymentInit from "./nodes/PaymentInit";
import PaymentCountry from "./nodes/PaymentCountry";
import PaymentProvider from "./nodes/PaymentProvider"; // ✅ FIXED TYPO

import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  Background,
  Controls,
  useReactFlow,
} from "reactflow";

import "reactflow/dist/style.css";
import { initialEdges, initialNodes } from "./Constants";
import { Box } from "@chakra-ui/react";
import CustomEdge from "./edges/CustomEdge";
import Sidebar from "../src/Sidebar"; // ✅ cleaner path

const nodeTypes = {
  paymentInit: PaymentInit,
  paymentCountry: PaymentCountry,
  paymentProvider: PaymentProvider,
};

const edgeTypes = {
  custom: CustomEdge,
};

export default function WorkFlow() {
  const reactFlowWrapper = useRef(null);

  const { project } = useReactFlow(); // ✅ now works (provider added)

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // ✅ Connect edges
  const onConnect = useCallback((params) => {
    setEdges((eds) =>
      addEdge(
        {
          ...params,
          type: "custom",
          animated: true,
        },
        eds,
      ),
    );
  }, []);

  // ✅ Delete Node
  const deleteNode = (nodeId) => {
    setNodes((nds) => nds.filter((node) => node.id !== nodeId));

    setEdges((eds) =>
      eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId),
    );
  };

  // ✅ Update Node
  const updateNode = (nodeId) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === nodeId
          ? {
              ...node,
              data: {
                ...node.data,
                provider:
                  node.data.provider === "Stripe" ? "Razorpay" : "Stripe",
              },
            }
          : node,
      ),
    );
  };

  // ✅ Add Node (manual button if needed)
  const addNode = () => {
    const newNode = {
      id: `${Date.now()}`,
      type: "paymentProvider",
      position: {
        x: Math.random() * 400,
        y: Math.random() * 400,
      },
      data: {
        provider: "Stripe",
        onDelete: deleteNode,
        onUpdate: updateNode,
      },
    };

    setNodes((nds) => [...nds, newNode]);
  };

  // ✅ Drag Over
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  // ✅ Drop from Sidebar
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");

      if (!type) return;

      const bounds = reactFlowWrapper.current.getBoundingClientRect();

      const position = project({
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      });

      const newNode = {
        id: `${Date.now()}`,
        type,
        position,
        data: {
          label: `${type} node`,
          onDelete: deleteNode,
          onUpdate: updateNode,
          ...(type === "paymentCountry" && {
            country: "India",
            currency: "INR",
            countryCode: "IN",
          }),
          ...(type === "paymentProvider" && {
            provider: "Stripe",
          } )
        },
      };

      setNodes((nds) => [...nds, newNode]);
    },
    [project],
  );

  return (
    <Box display="flex" height="100vh">
      {/* Sidebar */}
      <Sidebar />

      {/* Flow */}
      <Box flex={1} ref={reactFlowWrapper}>
        <button
          onClick={addNode}
          style={{ position: "absolute", top: 10, left: 10, zIndex: 10 }}
        >
          Add Node
        </button>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          fitView
        >
          <Background />
          <Controls />
        </ReactFlow>
      </Box>
    </Box>
  );
}
