import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Chip,
  Paper,
  Stack,
  TextField,
  Typography,
  InputAdornment,
  MenuItem,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import { DataGrid } from "@mui/x-data-grid";

import {
  fetchArticles,
  createArticle,
  updateArticle,
} from "../../services/ArticleService";

const statuses = ["Active", "Disabled"];

const blankForm = {
  title: "",
  slug: "",
  image: "",
  content: "",
  status: "Active",
};

const DashArticleListPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Modal
  const [openModal, setOpenModal] = useState(false);

  // Form
  const [form, setForm] = useState(blankForm);

  // Edit mode
  const [editMode, setEditMode] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  // LOAD ARTICLES
  const loadArticles = async () => {
    try {
      setLoading(true);

      const res = await fetchArticles();

      console.log("ARTICLES:", res.data);

      const data = res?.data;

      setArticles(
        Array.isArray(data)
          ? data
          : data?.articles || data?.data || []
      );

      setError("");
    } catch (err) {
      console.error(err);

      setError(
        err?.response?.data?.message ||
          "Failed to load articles"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  // FORM HANDLERS
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = (row) => {
    setForm({
      title: row.title,
      slug: row.slug,
      content: row.content,
      status: row.status,
    });

    setSelectedId(row._id);

    setEditMode(true);

    setOpenModal(true);
  };

  const handleDisable = async (id) => {
    try {
      await updateArticle(id, {
        status: "Disabled",
      });

      loadArticles();

    } catch (err) {
      console.error(err);

      setError("Failed to disable article");
    }
  };

  const handleSaveArticle = async () => {
    try {
      const payload = {
        ...form,
        slug: form.slug.trim().toLowerCase(),
      };

      if (editMode) {
        await updateArticle(selectedId, payload);
      } else {
        await createArticle(payload);
      }

      loadArticles();

      setForm(blankForm);

      setEditMode(false);
      setSelectedId(null);

      setOpenModal(false);

    } catch (err) {
      console.error(err);

      setError(
        err?.response?.data?.message ||
          "Failed to save article"
      );
    }
  };

  // FILTER LOGIC
  const filteredArticles = useMemo(() => {
    const safeArticles = Array.isArray(articles)
      ? articles
      : [];

    return safeArticles.filter((article) => {
      const search = searchQuery.toLowerCase();

      const matchesSearch =
        (article.title || "")
          .toLowerCase()
          .includes(search) ||
        (article.slug || "")
          .toLowerCase()
          .includes(search);

      const matchesStatus =
        filterStatus === "all" ||
        article.status === filterStatus;

      return matchesSearch && matchesStatus;
    });
  }, [articles, searchQuery, filterStatus]);

  // DATAGRID COLUMNS
  const columns = [
    {
      field: "_id",
      headerName: "ID",
      width: 100,
      valueGetter: (_, row) =>
        row._id?.substring(0, 6),
    },

    {
      field: "slug",
      headerName: "Slug",
      flex: 1,
      minWidth: 140,
    },

    {
      field: "title",
      headerName: "Title",
      flex: 1.5,
      minWidth: 180,
    },

    {
      field: "paragraphs",
      headerName: "Paragraphs",
      width: 120,
      valueGetter: (_, row) =>
        row.content
          ? row.content
              .split("\n")
              .filter((p) => p.trim()).length
          : 0,
    },

    {
      field: "preview",
      headerName: "Preview",
      flex: 1,
      minWidth: 200,
      valueGetter: (_, row) =>
        row.content
          ? row.content.substring(0, 30) + "..."
          : "No preview",
    },

    {
      field: "status",
      headerName: "Status",
      width: 120,

      renderCell: ({ row }) => (
        <Chip
          size="small"
          label={row.status || "Active"}
          color={
            row.status === "Active"
              ? "success"
              : "default"
          }
        />
      ),
    },

    {
      field: "actions",
      headerName: "Actions",
      width: 220,

      renderCell: ({ row }) => (
        <Stack direction="row" spacing={1}>
          <Button
            size="small"
            variant="outlined"
            onClick={() => handleEdit(row)}
          >
            Edit
          </Button>

          <Button
            size="small"
            variant="contained"
            color="warning"
            onClick={() => handleDisable(row._id)}
          >
            Disable
          </Button>
        </Stack>
      ),
    },
  ];

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          mb: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Typography variant="h4">
          Articles
        </Typography>

        <Button
          variant="contained"
          onClick={() => {
            setEditMode(false);
            setForm(blankForm);
            setOpenModal(true);
          }}
        >
          Add Article
        </Button>
      </Box>

      <Paper
        sx={{
          p: 2,
          mb: 3,
          borderRadius: 3,
          border: "1px solid #e0e0e0",
          boxShadow: "none",
          backgroundColor: "#fff",
        }}
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
        >
          <TextField
            fullWidth
            size="small"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) =>
              setSearchQuery(e.target.value)
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            select
            size="small"
            label="Status"
            value={filterStatus}
            onChange={(e) =>
              setFilterStatus(e.target.value)
            }
            sx={{ minWidth: 140 }}
          >
            <MenuItem value="all">
              All
            </MenuItem>

            {statuses.map((status) => (
              <MenuItem
                key={status}
                value={status}
              >
                {status}
              </MenuItem>
            ))}
          </TextField>
        </Stack>
      </Paper>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Paper
        sx={{
          p: 2,
          overflow: "hidden",
          borderRadius: 3,
          border: "1px solid #e0e0e0",
          boxShadow: "none",
          backgroundColor: "#fff",
        }}
      >
        <Box sx={{ height: 520, width: "100%" }}>
          <DataGrid
            rows={filteredArticles}
            columns={columns}
            getRowId={(row) => row._id}
            loading={loading}
            disableRowSelectionOnClick
            pageSizeOptions={[5, 10]}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            sx={{
              border: "none",
            }}
          />
        </Box>
      </Paper>

      <Dialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          {editMode ? "Edit Article" : "Add Article"}
        </DialogTitle>

        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Title"
              name="title"
              value={form.title}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              label="Slug"
              name="slug"
              value={form.slug}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              label="Content"
              name="content"
              value={form.content}
              onChange={handleChange}
              multiline
              rows={6}
              fullWidth
            />

            <TextField
              label="Image URL"
              name="image"
              value={form.image}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              select
              label="Status"
              name="status"
              value={form.status}
              onChange={handleChange}
              fullWidth
            >
              <MenuItem value="Active">
                Active
              </MenuItem>

              <MenuItem value="Disabled">
                Disabled
              </MenuItem>
            </TextField>
          </Stack>
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={() =>
              setOpenModal(false)
            }
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleSaveArticle}
          >
            {editMode ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DashArticleListPage;