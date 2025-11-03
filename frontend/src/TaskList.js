import React, { useEffect, useState } from 'react';
import { fetchTasks, updateTask, deleteTask } from './api/tasksApi';

import TaskForm from './TaskForm';
import Pagination from './Pagination';
import Filter from './Filter';
import CsvExport from './CsvExport';

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [pageInfo, setPageInfo] = useState({ page:1, limit:10, pages:1, total:0 });
  const [filters, setFilters] = useState({ status:'', priority:'', sortBy:'created_at', order:'desc', search: '' });

  const load = async (page = 1) => {
  try {
    const params = { ...filters, page, limit: pageInfo.limit };
    const res = await fetchTasks(params);

    // Support both axios (res.data) or fetch (res.json()) return types
    const data = res.data || res;

    // Adjust to whatever your backend sends back
    setTasks(data.data || data.tasks || data || []);
    setPageInfo(data.pagination || data.pageInfo || { page: 1, pages: 1, total: (data.data?.length || data.length || 0) });
  } catch (err) {
    console.error(err);
    alert("Error loading tasks");
  }
};


  useEffect(() => { load(1); }, [filters]);

  const onDelete = async (id) => {
    if (!window.confirm('Delete task?')) return;
    await deleteTask(id);
    load(pageInfo.page);
  };

  return (
  <div className="task-list">
    <h2>📋 Tasks</h2>

    {/* Filter Bar */}
    <Filter filters={filters} setFilters={setFilters} />

    {/* CSV Export */}
    <CsvExport data={tasks} filename="tasks_export.csv" />

    {/* Table */}
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Status</th>
          <th>Priority</th>
          <th>Due</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {(tasks || []).length > 0 ? (
          tasks.map((t) => (
            <tr key={t.id}>
              <td>{t.title}</td>
              <td>{t.status}</td>
              <td>{t.priority}</td>
              <td>{t.due_date ? new Date(t.due_date).toLocaleDateString() : "-"}</td>
              <td>
                <button onClick={() => navigator.clipboard.writeText(JSON.stringify(t))}>View</button>
                <button onClick={() => onDelete(t.id)}>Delete</button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="5" style={{ textAlign: "center", color: "gray" }}>
              No tasks found
            </td>
          </tr>
        )}
      </tbody>
    </table>

    <Pagination pageInfo={pageInfo} onPageChange={(p) => load(p)} />
  </div>
);
}