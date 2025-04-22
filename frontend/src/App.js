import { useState, useEffect } from 'react';
import api from './api';
import './App.css';

function App() {
    const [backendUp, setBackendUp]       = useState(false);
    const [view, setView]                 = useState('login');
    const [users, setUsers]               = useState([]);
    const [selectedUser, setUser]         = useState(null);
    const [loginCreds, setLoginCreds]     = useState({ username: '', password: '' });
    const [newUser, setNewUser]           = useState({ username: '', password: '' });
    const [tasks, setTasks]               = useState([]);
    const [newTask, setNewTask]           = useState({ title: '', dueDate: '' });
    const [error, setError]               = useState('');
    const [successMsg, setSuccessMsg]     = useState('');

    // 1) health check
    useEffect(() => {
        api.health()
            .then(() => setBackendUp(true))
            .catch(() => setBackendUp(false));
    }, []);

    // 2) load users once backend is up
    useEffect(() => {
        if (!backendUp) return;
        api.getUsers()
            .then(res => setUsers(res.data))
            .catch(() => setError('Failed to load users'));
    }, [backendUp]);

    // 3) fetch tasks whenever we log in
    useEffect(() => {
        if (!selectedUser) return;
        api.getTasks(selectedUser.id)
            .then(res => setTasks(res.data))
            .catch(() => setError('Failed to load tasks'));
    }, [selectedUser]);

    const handleLogin = e => {
        e.preventDefault();
        setError('');
        setSuccessMsg('');        // clear any prior success
        const u = users.find(u =>
            u.username === loginCreds.username &&
            u.password === loginCreds.password
        );
        if (u) {
            setUser(u);
            setView('tasks');
        } else {
            setError('Invalid credentials');
        }
    };

    const handleRegister = e => {
        e.preventDefault();
        setError('');
        api.createUser(newUser)
            .then(res => {
                setUsers([...users, res.data]);
                setNewUser({ username: '', password: '' });
                setView('login');
                setSuccessMsg('Account created! You may now log in.');  // <-- success
            })
            .catch(() => setError('Failed to register'));
    };

    const createTask = e => {
        e.preventDefault();
        api.createTask(selectedUser.id, newTask)
            .then(res => {
                setTasks(prev => [...prev, res.data]);
                setNewTask({ title: '', dueDate: '' });
            })
            .catch(() => setError('Failed to add task'));
    };

    const deleteTask = id => {
        api.deleteTask(id)
            .then(() => {
                setTasks(prev => prev.filter(t => t.id !== id));
            })
            .catch(() => setError('Failed to delete'));
    };

    const doLogout = () => {
        setView('login');
        setUser(null);
        setTasks([]);
        setNewTask({ title: '', dueDate: '' });
        setLoginCreds({ username: '', password: '' });
        setError('');
        setSuccessMsg('');
    };

    // ── Render ───────────────────────────────────────────────────────────────────

    if (!backendUp) {
        return (
            <div className="app-container">
                <h1>To‑Do List</h1>
                <p><em>Waiting for server…</em></p>
            </div>
        );
    }

    // ── LOGIN ─────────────────────────────────────────────────────────────────────
    if (view === 'login') {
        return (
            <div className="app-container">
                <h1>To‑Do List</h1>
                <form onSubmit={handleLogin}>
                    <h2>Login</h2>
                    {successMsg && <p className="success">{successMsg}</p>}
                    {error      && <p className="error">{error}</p>}
                    <input
                        className="text-input"
                        type="text"
                        placeholder="Username"
                        autoComplete="username"
                        value={loginCreds.username}
                        onChange={e => setLoginCreds({ ...loginCreds, username: e.target.value })}
                        required
                    />
                    <input
                        className="text-input"
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={loginCreds.password}
                        onChange={e => setLoginCreds({ ...loginCreds, password: e.target.value })}
                        required
                    />
                    <button className="btn-submit" type="submit">Login</button>
                </form>
                <p>
                    Don’t have an account?{' '}
                    <span className="link"
                          onClick={() => { setView('register'); setError(''); setSuccessMsg(''); }}>
            Register
          </span>
                </p>
            </div>
        );
    }

    // ── REGISTER ──────────────────────────────────────────────────────────────────
    if (view === 'register') {
        return (
            <div className="app-container">
                <h1>To‑Do List</h1>
                <form onSubmit={handleRegister}>
                    <h2>Register</h2>
                    {error && <p className="error">{error}</p>}
                    <input
                        className="text-input"
                        type="text"
                        placeholder="Username"
                        autoComplete="username"
                        value={newUser.username}
                        onChange={e => setNewUser({ ...newUser, username: e.target.value })}
                        required
                    />
                    <input
                        className="text-input"
                        type="password"
                        placeholder="Password"
                        autoComplete="new-password"
                        value={newUser.password}
                        onChange={e => setNewUser({ ...newUser, password: e.target.value })}
                        required
                    />
                    <button className="btn-submit" type="submit">Register</button>
                </form>
                <p>
                    Already have an account?{' '}
                    <span className="link"
                          onClick={() => { setView('login'); setError(''); setSuccessMsg(''); }}>
            Login
          </span>
                </p>
            </div>
        );
    }

    // ── TASKS ────────────────────────────────────────────────────────────────────
    return (
        <div className="app-container">
            <div className="header-row">
                <h1>Tasks for {selectedUser.username}</h1>
                <button className="logout" onClick={doLogout}>Logout</button>
            </div>

            <ul className="task-list">
                {tasks.length === 0
                    ? <li className="task-item"><em>No tasks yet</em></li>
                    : tasks.map(t => (
                        <li key={t.id} className="task-item">
              <span>
                <span className="task-title">{t.title}</span>
                <span className="task-date">{t.dueDate}</span>
              </span>
                            <button className="delete-btn" onClick={() => deleteTask(t.id)}>
                                &times;
                            </button>
                        </li>
                    ))
                }
            </ul>

            <form onSubmit={createTask}>
                <h2>New Task</h2>
                <input
                    className="text-input"
                    type="text"
                    placeholder="Insert task name here"
                    value={newTask.title}
                    onChange={e => setNewTask({ ...newTask, title: e.target.value })}
                    required
                />
                <input
                    className="text-input"
                    type="date"
                    value={newTask.dueDate}
                    onChange={e => setNewTask({ ...newTask, dueDate: e.target.value })}
                    required
                />
                <button className="btn-submit" type="submit">Add Task</button>
            </form>
        </div>
    );
}

export default App;