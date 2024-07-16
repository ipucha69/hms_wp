import React from 'react';
import {  Menu, Avatar, Dropdown } from 'antd';
import { UserIcon } from 'hugeicons-react';

const UserMenu = () => (
    <Menu>
        <Menu.Item key="profile">
            <a href="/profile">Profile</a>
        </Menu.Item>
        <Menu.Item key="edit-profile">
            <a href="/edit-profile">Edit Profile</a>
        </Menu.Item>
        <Menu.Item key="update-password">
            <a href="/update-password">Update Password</a>
        </Menu.Item>
    </Menu>
);

const ProfileHeader = () => {
    return (
        <Dropdown overlay={UserMenu} trigger={['click']}>
            <Avatar style={{ cursor: 'pointer' }} icon={<UserIcon size={20} />} />
        </Dropdown>
    );
};

export default ProfileHeader;
