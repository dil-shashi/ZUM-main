import React, { useEffect, useState } from "react";
import {
  AddRounded,
  RemoveRounded,
  Person as PersonIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
} from "@mui/icons-material";
import {
  Box,
  IconButton,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Avatar,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  useTheme,
  useMediaQuery
} from "@mui/material";

// API functions
const getUsers = async () => {
  const res = await fetch("http://localhost:8080/api/v1/users");
  if (!res.ok) throw new Error("Network response was not ok");
  return res.json();
};

const updateUser = async (id, data) => {
  const res = await fetch(`http://localhost:8080/api/v1/users/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    // Add Authorization header if needed
  });
  if (!res.ok) throw new Error("Failed to update user");
  return res.json();
};

const deleteUser = async (id) => {
  const res = await fetch(`http://localhost:8080/api/v1/users/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete user");
  return true;
};

const Profile = ({ value = 1, onClick = () => { }, sx = {}, isAdmin = true }) => {
  // Users state for admin
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [error, setError] = useState(null);
  //keeping the screen responsive
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  // Edit/Delete state
  const [editUser, setEditUser] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", email: "" });
  const [editLoading, setEditLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Fetch users
  useEffect(() => {
    if (isAdmin) {
      setLoadingUsers(true);
      setError(null);
      getUsers()
        .then((data) => {
          setUsers(data.data || data); // Handles both {data: [...]} and [...]
          setLoadingUsers(false);
        })
        .catch(() => {
          setError("Failed to fetch users");
          setLoadingUsers(false);
        });
    } else {
      setUsers([]);
    }
  }, [isAdmin]);

  // Open edit dialog
  const handleEditOpen = (user) => {
    setEditUser(user);
    setEditForm({ name: user.name, email: user.email });
  };

  // Handle edit form changes
  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  // Save edited user
  const handleEditSave = () => {
    setEditLoading(true);
    updateUser(editUser.id, editForm)
      .then(() => {
        setUsers((prev) =>
          prev.map((u) => (u.id === editUser.id ? { ...u, ...editForm } : u))
        );
        setEditUser(null);
        setEditLoading(false);
      })
      .catch(() => {
        setEditLoading(false);
        alert("Failed to update user");
      });
  };

  // Cancel edit
  const handleEditCancel = () => {
    setEditUser(null);
  };

  // Delete user
  const handleDelete = (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    setDeleteLoading(true);
    deleteUser(userId)
      .then(() => {
        setUsers((prev) => prev.filter((u) => u.id !== userId));
        setDeleteLoading(false);
      })
      .catch(() => {
        setDeleteLoading(false);
        alert("Failed to delete user");
      });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflowX: "hidden", // Prevent horizontal scroll
        px: 2,
        boxSizing: "border-box",
        background: "#f9f9f9",
      }}
    >
      {/* Profile Controls */}
      <Box
        sx={{
          display: "flex",
          gap: 1,
          mt: { xs: 1, md: 0 },
          flexDirection: "row",
          borderRadius: "15px",
          backgroundColor: "rgba(0,90,0,.1)",
          maxWidth: "fit-content",
          ...sx,
        }}
      >
        <IconButton size="small" onClick={() => onClick(value - 1)}>
          <RemoveRounded sx={{ fontSize: "1.57rem" }} />
        </IconButton>
        <Box
          sx={{
            width: "30px",
            backgroundColor: (theme) => theme.palette.primary.main,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: "12px",
              color: "white",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {value}
          </Typography>
        </Box>
        <IconButton size="small" onClick={() => onClick(value + 1)}>
          <AddRounded sx={{ fontSize: "1.57rem" }} />
        </IconButton>
      </Box>

      {/* Users List for Admin */}
      {isAdmin && (
        <Box mt={4}>
          <Typography variant="h6" gutterBottom>
            Users List
          </Typography>
          {loadingUsers ? (
            <CircularProgress />
          ) : error ? (
            <Typography color="error">{error}</Typography>
          ) : (
            <TableContainer
              component={Paper}
              sx={{
                maxWidth: 600,
                width: "100%",
                overflowX: "auto",
                [theme.breakpoints.down("sm")]: {
                  maxWidth: "100vw",
                  boxShadow: "none",
                },
              }}
            >
              <Table
                sx={{
                  minWidth: 350,
                  "& td, & th": {
                    padding: isMobile ? "8px 4px" : "16px",
                    fontSize: isMobile ? "0.85rem" : "1rem",
                  },
                }}
                size={isMobile ? "small" : "medium"}
              >
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Avatar</TableCell>
                    <TableCell align="center">Name</TableCell>
                    <TableCell align="center">Email</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users && users.length > 0 ? (
                    users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell align="center">
                          <Avatar>
                            <PersonIcon />
                          </Avatar>
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            maxWidth: isMobile ? 80 : 200,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {user.name}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            maxWidth: isMobile ? 120 : 250,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {user.email}
                        </TableCell>
                        <TableCell align="right">
                          <IconButton
                            size="small"
                            onClick={() => handleEditOpen(user)}
                            disabled={editLoading || deleteLoading}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleDelete(user.id)}
                            disabled={editLoading || deleteLoading}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} align="center">
                        No users found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          {/* Edit Dialog */}
          <Dialog open={!!editUser} onClose={handleEditCancel}>
            <DialogTitle>Edit User</DialogTitle>
            <DialogContent>
              <TextField
                margin="dense"
                label="Name"
                name="name"
                value={editForm.name}
                onChange={handleEditChange}
                fullWidth
                variant="standard"
              />
              <TextField
                margin="dense"
                label="Email"
                name="email"
                value={editForm.email}
                onChange={handleEditChange}
                fullWidth
                variant="standard"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleEditCancel} startIcon={<CancelIcon />} disabled={editLoading}>
                Cancel
              </Button>
              <Button
                onClick={handleEditSave}
                startIcon={<SaveIcon />}
                disabled={editLoading}
                variant="contained"
              >
                {editLoading ? <CircularProgress size={20} /> : "Save"}
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      )}
    </Box>
  );
};

export default Profile;