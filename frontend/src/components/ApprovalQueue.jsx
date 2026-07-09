import React, { useState } from 'react';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Button, TextField, Typography, Box, Dialog, DialogTitle, DialogContent, 
  DialogActions, Chip 
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

export default function ApprovalQueue({ approvals, onAction }) {
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
        <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', p: 3 }}>
          <Typography variant="body2" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
            No pending human authorizations in queue.
          </Typography>
        </Box>
      ) : (
        <TableContainer sx={{ maxHeight: 250 }}>
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ bgcolor: 'background.paper', fontWeight: 'bold' }}>Task Description</TableCell>
                <TableCell sx={{ bgcolor: 'background.paper', fontWeight: 'bold' }}>Requested Action</TableCell>
                <TableCell sx={{ bgcolor: 'background.paper', fontWeight: 'bold' }}>Governance</TableCell>
                <TableCell sx={{ bgcolor: 'background.paper', fontWeight: 'bold', textAlign: 'center' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {approvals.map((appr) => (
                <TableRow key={appr.id}>
                  <TableCell sx={{ color: 'text.secondary' }}>{appr.task_description}</TableCell>
                  <TableCell sx={{ color: 'text.primary', fontWeight: 500 }}>{appr.action_name}</TableCell>
                  <TableCell>
                    <Chip label="Awaiting Approval" color="warning" size="small" variant="outlined" />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                      <Button
                        size="small"
                        variant="contained"
                        color="success"
                        startIcon={<CheckIcon />}
                        onClick={() => handleOpenDialog(appr, 'APPROVED')}
                      >
                        Approve
                      </Button>
                      <Button
                        size="small"
                        variant="outlined"
                        color="error"
                        startIcon={<CloseIcon />}
                        onClick={() => handleOpenDialog(appr, 'REJECTED')}
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
      <Dialog open={open} onClose={handleClose} PaperProps={{ sx: { bgcolor: '#111827', border: '1px solid #1f2937', minWidth: 350 } }}>
        <DialogTitle sx={{ color: actionType === 'APPROVED' ? 'success.main' : 'error.main', fontFamily: '"Outfit", sans-serif' }}>
          {actionType === 'APPROVED' ? 'Authorize Action' : 'Reject Action'}
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
            Verify execution metadata for: <strong>{selectedApproval?.action_name}</strong>
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
          />
        </DialogContent>
        <DialogActions sx={{ p: 2, borderTop: '1px solid #1f2937' }}>
          <Button onClick={handleClose} variant="outlined" color="inherit">Cancel</Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained" 
            color={actionType === 'APPROVED' ? 'success' : 'error'}
          >
            Confirm Decision
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
