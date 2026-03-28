"use client"
import UserServer from "../user-services/route"
import { useEffect, useState } from "react";

export default function UserPage() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function fetchUsers() {
            const data = await UserServer();
            setUsers(data);
        }
        fetchUsers();
    }, []);

    return (
        <div>
            <h1>User List</h1>
            <ul>
                {users.map(user => (
                    <li key={user.id}>{user.title}</li>
                ))}
            </ul>
        </div>
    );
}