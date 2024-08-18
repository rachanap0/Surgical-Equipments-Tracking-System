"use client";

import React from 'react'
import { FaSearch } from "react-icons/fa";

function Homepage() {

    const initialData = [
        { tagId: '001', equipmentName: 'Excavator', date: '04/23/2024', time: '2:24 AM', lastSeen: 'OT', status: 'In Use', statusColor: 'status-yellow' },
        { tagId: '002', equipmentName: 'Bulldozer', date: '04/22/2024', time: '1:24 AM', lastSeen: 'SR', status: 'Maintenance', statusColor: 'status-red' },
        { tagId: '003', equipmentName: 'Crane', date: '04/20/2024', time: '2:24 PM', lastSeen: 'SR', status: 'Available', statusColor: 'status-green' },
        { tagId: '004', equipmentName: 'Loader', date: '02/24/2024', time: '12:00 PM', lastSeen: 'OT', status: 'Available', statusColor: 'status-green' },
        { tagId: '005', equipmentName: 'Forklift', date: '06/30/2023', time: '2:24 AM', lastSeen: 'OT', status: 'In Use', statusColor: 'status-yellow' },
        // ... more data
    ];

    const [sortedData, setSortedData] = React.useState(initialData);

    // Placeholder data for the equipment and tag IDs
    const equipmentData = {
        tagId: 'Tag ID',
        equipmentName: 'Equipment Name'
    };

    const sortStatus = (status) => {
        if (status === 'Status') {
            sortDate('desc');
            return;
        }
        const statusOrder = {
            'Available': 1,
            'In Use': 2,
            'Maintenance': 3
        };
        const sorted = [...initialData].sort((a, b) => {
            return statusOrder[a.status] === statusOrder[status] ? -1 : statusOrder[b.status] === statusOrder[status] ? 1 : statusOrder[a.status] - statusOrder[b.status];
        });
        setSortedData(sorted);
    };

    const sortDate = (order) => {
        const sorted = [...initialData].sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return order === 'asc' ? dateA - dateB : dateB - dateA;
        });
        setSortedData(sorted);
    };

    const sortLastSeen = (order) => {
        if (order === 'Filter') {
            sortDate('desc');
            return;
        }
        const lastSeenOrder = {
            'SR': 1,
            'OT': 2
        };
        const sorted = [...initialData].sort((a, b) => {
            return order === 'asc' ? lastSeenOrder[a.lastSeen] - lastSeenOrder[b.lastSeen] : lastSeenOrder[b.lastSeen] - lastSeenOrder[a.lastSeen];
        });
        setSortedData(sorted);
    };

    React.useEffect(() => {
        sortDate('desc'); // Default sorting by latest date
    }, []);

    return (
        <div className="container mx-auto px-4">
            <div className="flex justify-between items-center py-6">
                <h1 className="text-3xl font-bold">Individual Item Log</h1>
            </div>
            <div className="flex justify-between mb-4">
                <div className="flex space-x-2">
                    <div className="flex flex-col">
                        <input className="border-2 border-gray-300 bg-white h-10 px-5 rounded-lg text-sm focus:outline-none"
                            type="text" placeholder="Tag ID" disabled />
                    </div>
                    <div className="flex flex-col">
                        <input className="border-2 border-gray-300 bg-white h-10 px-5 rounded-lg text-sm focus:outline-none"
                            type="text" placeholder="Equipment Name" disabled />
                    </div>
                </div>
            </div>
            <div className="flex mb-4">
                <div className="flex-grow flex justify-start items-center space-x-2">
                    <input className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                        type="search" name="search" placeholder="Search Tag ID" />
                    <button className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded">
                        <FaSearch />
                    </button>
                </div>

                <div className="flex justify-end items-center space-x-2">
                    <select className="border-2 border-gray-300 bg-white h-10 rounded-lg text-sm focus:outline-none"
                        onChange={(e) => sortStatus(e.target.value)}>
                        <option>Status</option>
                        <option value="Available">Available</option>
                        <option value="In Use">In Use</option>
                        <option value="Maintenance">Maintenance</option>
                    </select>
                    <select className="border-2 border-gray-300 bg-white h-10 rounded-lg text-sm focus:outline-none"
                        onChange={(e) => {
                            if (e.target.value === 'Earliest Arrival') {
                                sortDate('asc');
                            } else if (e.target.value === 'Latest location') {
                                sortDate('desc');
                            } else if (e.target.value === 'Sterilization Room') {
                                sortLastSeen('asc');
                            } else if (e.target.value === 'Operation Theatre') {
                                sortLastSeen('desc');
                            } else {
                                sortDate('desc');
                            }
                        }}>
                        <option>Filter</option>
                        <option>Earliest Arrival</option>
                        <option>Latest Location</option>
                        <option>Sterilization Room</option>
                        <option>Operation Theatre</option>
                    </select>
                </div>
            </div>
            <table className="table-auto w-full">
                <thead>
                    <tr className="border-b">
                        <th className="text-left pb-2">Date</th>
                        <th className="text-left pb-2">Time</th>
                        <th className="text-left pb-2">Last Seen</th>
                        <th className="text-left pb-2">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedData.map((item, index) => (
                        <tr className="border-b" key={index}>
                            <td className="py-2">{item.date}</td>
                            <td className="py-2">{item.time}</td>
                            <td className="py-2">{item.lastSeen}</td>
                            <td className="py-2">
                                <span className={`bg-${item.statusColor} text-black font-bold py-1 px-3 rounded-full text-xs`}>
                                    {item.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Homepage