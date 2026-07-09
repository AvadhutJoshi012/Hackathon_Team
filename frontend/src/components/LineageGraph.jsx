import React, { useMemo } from 'react';
import ReactFlow, { Background, Controls, MarkerType } from 'reactflow';
import 'reactflow/dist/style.css';
import { Box } from '@mui/material';

export default function LineageGraph({ agents, isStreaming, activeScenario, selectedAgentId }) {
  
  // Custom Node & Edge Styling dynamically generated from active database agents
  const { nodes, edges } = useMemo(() => {
    // 1. Separate Orchestrator and Specialists
    const orchestratorAgent = agents.find(a => a.id === 'orchestrator') || {
      id: 'orchestrator', name: 'Orchestrator Agent', role: 'Planner & Router', status: 'ACTIVE'
    };
    const specialists = agents.filter(a => a.id !== 'orchestrator');

    // 2. Generate Nodes
    const flowNodes = [];
    const N = specialists.length;
    const spacing = 220; // safe horizontal distance between nodes
    const widthRange = Math.max(500, (N - 1) * spacing);
    const centerX = widthRange / 2 + 50;

    // Orchestrator Node (top center) - Cyan/Yellow theme
    const isOrchestratorSelected = selectedAgentId === 'orchestrator';
    flowNodes.push({
      id: 'orchestrator',
      position: { x: centerX - 75, y: 30 }, // centered based on child coordinates (subtracting half of node width)
      data: {
        label: (
          <Box sx={{ p: 1.5, minWidth: 150, textAlign: 'left' }}>
            <div style={{ fontWeight: 700, fontSize: '13px', color: '#ffc700' }}>{orchestratorAgent.name}</div>
            <div style={{ fontSize: '10px', color: '#8f9cae', marginTop: '2px' }}>{orchestratorAgent.role}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '8px', fontSize: '9px', fontWeight: 'bold' }}>
              <span style={{ 
                width: '6px', 
                height: '6px', 
                borderRadius: '50%', 
                backgroundColor: isStreaming ? '#00ff9d' : '#536275',
                animation: isStreaming ? 'pulse 1.5s infinite' : 'none'
              }}></span>
              {isStreaming ? 'PROCESSING' : 'IDLE'}
            </div>
          </Box>
        )
      },
      style: {
        backgroundColor: '#111a22', // Secondary Background
        color: '#f0f2f5',           // Text Primary
        border: isStreaming || isOrchestratorSelected ? '2px solid #ffc700' : '1px solid #161a22', // Cyber Yellow border when active or selected
        borderRadius: '10px',
        boxShadow: isStreaming || isOrchestratorSelected ? '0 0 15px rgba(255, 199, 0, 0.4)' : 'none',
      }
    });

    // Specialized Nodes (positioned dynamically on the second row)
    specialists.forEach((agent, index) => {
      // Calculate horizontal coordinate x centering on orchestrator width
      let x = centerX - 75;
      if (N > 1) {
        x = 50 + (index / (N - 1)) * widthRange;
      }
      
      const isCurrentRunAgent = isStreaming && (
        (agent.id === 'hr_agent' && activeScenario === 'hr_onboard') ||
        (agent.id === 'finance_agent' && ['approval_demo', 'loop_demo'].includes(activeScenario)) ||
        (!['hr_agent', 'finance_agent'].includes(agent.id) && activeScenario === 'standard')
      );

      const isSelected = selectedAgentId === agent.id;

      // Determine status dot color using cyber palette
      let statusColor = '#536275'; // Text Muted / Idle
      let nodeBorder = isSelected ? '2px solid #ffc700' : '1px solid #161a22';
      let nodeShadow = isSelected ? '0 0 15px rgba(255, 199, 0, 0.4)' : 'none';
      let statusText = agent.status || 'ACTIVE';

      if (agent.status === 'SUSPENDED') {
        statusColor = '#ff3366'; // Failure Red
        nodeBorder = '2px solid #ff3366';
        statusText = 'SUSPENDED';
      } else if (isCurrentRunAgent) {
        if (activeScenario === 'loop_demo') {
          statusColor = '#ff3366'; // Failure Red
          nodeBorder = '2px solid #ff3366';
          nodeShadow = '0 0 15px rgba(255, 51, 102, 0.4)';
          statusText = 'ERROR LOOP';
        } else if (activeScenario === 'approval_demo') {
          statusColor = '#ffaa00'; // Warning Amber
          nodeBorder = '2px solid #ffaa00';
          nodeShadow = '0 0 15px rgba(255, 170, 0, 0.4)';
          statusText = 'AWAITING APPROVAL';
        } else {
          statusColor = '#00ff9d'; // Success Green
          nodeBorder = '2px solid #00ff9d';
          nodeShadow = '0 0 15px rgba(0, 255, 157, 0.4)';
          statusText = 'ACTIVE RUN';
        }
      } else {
        // Default Active (but idle) agent color
        statusColor = '#00e5ff'; // Info Cyan
        statusText = 'ACTIVE';
      }

      flowNodes.push({
        id: agent.id,
        position: { x, y: 220 },
        data: {
          label: (
            <Box sx={{ p: 1.5, minWidth: 150, textAlign: 'left' }}>
              <div style={{ fontWeight: 700, fontSize: '13px', color: statusColor }}>{agent.name}</div>
              <div style={{ fontSize: '10px', color: '#8f9cae', marginTop: '2px' }}>{agent.role}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '8px', fontSize: '9px', fontWeight: 'bold' }}>
                <span style={{ 
                  width: '6px', 
                  height: '6px', 
                  borderRadius: '50%', 
                  backgroundColor: statusColor,
                  animation: isCurrentRunAgent ? 'pulse 1.5s infinite' : 'none'
                }}></span>
                {statusText}
              </div>
            </Box>
          )
        },
        style: {
          backgroundColor: '#111a22', // Secondary Background
          color: '#f0f2f5',           // Text Primary
          border: nodeBorder,
          borderRadius: '10px',
          boxShadow: nodeShadow,
        }
      });
    });

    // 3. Generate Edges (all specialists connect from orchestrator)
    const flowEdges = [];
    specialists.forEach((agent) => {
      const isCurrentRunEdge = isStreaming && (
        (agent.id === 'hr_agent' && activeScenario === 'hr_onboard') ||
        (agent.id === 'finance_agent' && ['approval_demo', 'loop_demo'].includes(activeScenario)) ||
        (!['hr_agent', 'finance_agent'].includes(agent.id) && activeScenario === 'standard')
      );

      let strokeColor = '#161a22'; // Default Tertiary border color
      if (isCurrentRunEdge) {
        if (activeScenario === 'loop_demo') strokeColor = '#ff3366'; // Failure Red
        else if (activeScenario === 'approval_demo') strokeColor = '#ffaa00'; // Warning Amber
        else strokeColor = '#00ff9d'; // Success Green
      }

      flowEdges.push({
        id: `e-orchestrator-${agent.id}`,
        source: 'orchestrator',
        target: agent.id,
        animated: isCurrentRunEdge,
        style: {
          stroke: strokeColor,
          strokeWidth: isCurrentRunEdge ? 3 : 1.5
        },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: strokeColor,
        }
      });
    });

    return { nodes: flowNodes, edges: flowEdges };
  }, [agents, isStreaming, activeScenario, selectedAgentId]);

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <style>{`
        @keyframes pulse {
          0% { transform: scale(0.95); opacity: 0.5; }
          50% { transform: scale(1.2); opacity: 1; }
          100% { transform: scale(0.95); opacity: 0.5; }
        }
      `}</style>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        style={{ background: '#0a0b0d' }} // Primary Background
      >
        <Background color="#161a22" gap={16} size={1} />
        <Controls showInteractive={false} />
      </ReactFlow>
    </Box>
  );
}
