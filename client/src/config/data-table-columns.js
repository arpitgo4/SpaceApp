
import React, { Component } from 'react';

import { string_sorter } from '../config/utils';

export const ASSET_COLUMNS = (params) => {
    const { users } = params;

    const user_hash_table = users.reduce((acc, user) => {
        if (!acc[user.sys.id])
            acc[user.sys.id] = user.fields.name;
        return acc;
    }, {});

    return [
        {
            title: 'Title',
            key: Math.random(),
            dataIndex: 'fields.title',
            sorter: (a, b) => string_sorter(a.fields.title, b.fields.title),
        },
        {
            title: 'Content Type',
            key: Math.random(),
            dataIndex: 'fields.contentType',
            sorter: (a, b) => string_sorter(a.fields.contentType, b.fields.contentType),
        },
        {
            title: 'File Name',
            key: Math.random(),
            dataIndex: 'fields.fileName',
            sorter: (a, b) => string_sorter(a.fields.fileName, b.fields.fileName),
        },
        {
            title: 'Created By',
            key: Math.random(),
            dataIndex: 'sys.createdBy',
            render: userId => user_hash_table[userId] || 'N/A',
            sorter: (a, b) => string_sorter(a.sys.createdBy, b.sys.createdBy),
        },
        {
            title: 'Updated By',
            key: Math.random(),
            dataIndex: 'sys.updatedBy',
            render: userId => user_hash_table[userId] || 'N/A',
            sorter: (a, b) => string_sorter(a.sys.updatedBy, b.sys.updatedBy),
        },
        {
            title: 'Last Updated',
            key: Math.random(),
            dataIndex: 'sys.updatedAt',
            render: date => new Date(date).toDateString(),
            sorter: (a, b) => Date.parse(a.sys.updatedAt) - Date.parse(b.sys.updatedAt)
        },
    ];
};


export const ENTRIES_COLUMNS = params => {
    const { users } = params;

    const user_hash_table = users.reduce((acc, user) => {
        if (!acc[user.sys.id])
            acc[user.sys.id] = user.fields.name;
        return acc;
    }, {});

    return [
        {
            title: 'Title',
            key: Math.random(),
            dataIndex: 'fields.title',
            sorter: (a, b) => string_sorter(a.fields.title, b.fields.title),
        },
        {
            title: 'Summary',
            key: Math.random(),
            dataIndex: 'fields.summary',
            sorter: (a, b) => string_sorter(a.fields.summary, b.fields.summary),   
        },
        {
            title: 'Created By',
            key: Math.random(),
            dataIndex: 'sys.createdBy',
            render: userId => user_hash_table[userId] || 'N/A',
            sorter: (a, b) => string_sorter(a.sys.createdBy, b.sys.createdBy), 
        },
        {
            title: 'Updated By',
            key: Math.random(),
            dataIndex: 'sys.updatedBy', 
            render: userId => user_hash_table[userId] || 'N/A',
            sorter: (a, b) => string_sorter(a.sys.updatedBy, b.sys.updatedBy),
        },
        {
            title: 'Last Updated',
            key: Math.random(),
            dataIndex: 'sys.updatedAt',
            render: date => new Date(date).toDateString(),
            sorter: (a, b) => Date.parse(a.sys.updatedAt) - Date.parse(b.sys.updatedAt)
        },
    ];
};
