import React, { useState } from 'react';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Button, TextField, Typography, Box, Dialog, DialogTitle, DialogContent, 
  DialogActions, Chip 
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

export default function ApprovalQueue({ approvals, onAction, isLight }) {
  const [open, setOpen] = useState(false);
  const [selectedApproval, setSelectedApproval] = useState(null);
  const [actionType, setActionType] = useState('APPROVED'); // APPROVED or REJECTED
  const [reason, setReason] = useState('');

  const handleOpenDialog = (appr, type) => {
    setSelectedApproval(appr);
    setActionType(type);
    setReason('');
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedApproval(null);
  };

  const handleSubmit = () => {
    if (selectedApproval) {
      onAction(selectedApproval.id, actionType, reason);
      handleClose();
    }
  };

  return (
    <Box sx={{ flexGrow: 1, overflowY: 'auto', minHeight: '200px' }}>
      {approvals.length === 0 ? (
        <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', p: 5 }}>
          <Typography variant="body1" sx={{ color: isLight ? '#536275' : 'text.secondary', fontStyle: 'italic', fontWeight: 500 }}>
            No pending human authorizations in queue.
          </Typography>
        </Box>
      ) : (
        <TableContainer sx={{ maxHeight: 350 }}>
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ bgcolor: isLight ? '#ffffff' : 'background.paper', color: isLight ? '#0a0b0d' : '#8f9cae', fontWeight: 'bold', borderColor: isLight ? '#e0e2e5' : '#161a22' }}>Task Description</TableCell>
                <TableCell sx={{ bgcolor: isLight ? '#ffffff' : 'background.paper', color: isLight ? '#0a0b0d' : '#8f9cae', fontWeight: 'bold', borderColor: isLight ? '#e0e2e5' : '#161a22' }}>Requested Action</TableCell>
                <TableCell sx={{ bgcolor: isLight ? '#ffffff' : 'background.paper', color: isLight ? '#0a0b0d' : '#8f9cae', fontWeight: 'bold', borderColor: isLight ? '#e0e2e5' : '#161a22' }}>Governance</TableCell>
                <TableCell sx={{ bgcolor: isLight ? '#ffffff' : 'background.paper', color: isLight ? '#0a0b0d' : '#8f9cae', fontWeight: 'bold', textAlign: 'center', borderColor: isLight ? '#e0e2e5' : '#161a22' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {approvals.map((appr) => (
                <TableRow key={appr.id}>
                  <TableCell sx={{ color: isLight ? '#0a0b0d' : 'text.secondary', borderColor: isLight ? '#e0e2e5' : '#161a22' }}>{appr.task_description}</TableCell>
                  <TableCell sx={{ color: isLight ? '#ca8a04' : '#ffc700', fontWeight: 600, borderColor: isLight ? '#e0e2e5' : '#161a22' }}>{appr.action_name}</TableCell>
                  <TableCell sx={{ borderColor: isLight ? '#e0e2e5' : '#161a22' }}>
                    <Chip label="Awaiting Approval" color="warning" size="small" variant="outlined" />
                  </TableCell>
                  <TableCell sx={{ borderColor: isLight ? '#e0e2e5' : '#161a22' }}>
                    <Box sx={{ display: 'flex', gap: 1.5, justifyContent: 'center' }}>
                      <Button
                        size="small"
                        variant="contained"
                        color="success"
                        startIcon={<CheckIcon />}
                        onClick={() => handleOpenDialog(appr, 'APPROVED')}
                        sx={{ fontWeight: 'bold', textTransform: 'none' }}
                      >
                        Approve
                      </Button>
                      <Button
                        size="small"
                        variant="contained"
                        color="error"
                        startIcon={<CloseIcon />}
                        onClick={() => handleOpenDialog(appr, 'REJECTED')}
                        sx={{ fontWeight: 'bold', textTransform: 'none' }}
                      >
                        Reject
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Decision Comment Modal */}
      <Dialog 
        open={open} 
        onClose={handleClose} 
        PaperProps={{ 
          sx: { 
            bgcolor: isLight ? '#ffffff' : '#111827', 
            border: isLight ? '1px solid #e0e2e5' : '1px solid #1f2937', 
            color: isLight ? '#0a0b0d' : '#f0f2f5',
            minWidth: 380 
          } 
        }}
      >
        <DialogTitle sx={{ color: actionType === 'APPROVED' ? 'success.main' : 'error.main', fontFamily: '"Outfit", sans-serif', fontWeight: 800 }}>
          {actionType === 'APPROVED' ? 'Authorize Action' : 'Reject Action'}
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2.5, color: isLight ? '#536275' : 'text.secondary' }}>
            Verify execution metadata for: <strong style={{ color: isLight ? '#ca8a04' : '#ffc700' }}>{selectedApproval?.action_name}</strong>
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={3}
            size="small"
            label="Provide comment/reason (optional)"
            variant="outlined"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            InputLabelProps={{ style: { color: isLight ? '#536275' : '#8f9cae' } }}
            inputProps={{ style: { color: isLight ? '#0a0b0d' : '#f0f2f5' } }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2.5, borderTop: isLight ? '1px solid #e0e2e5' : '1px solid #1f2937' }}>
          <Button onClick={handleClose} variant="outlined" color="inherit">Cancel</Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained" 
            color={actionType === 'APPROVED' ? 'success' : 'error'}
            sx={{ fontWeight: 'bold' }}
          >
            Confirm Decision
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
