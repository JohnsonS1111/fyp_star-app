import React from "react";

const AccountProfileauth = async ({ params }) => {
  return (
    <div>
      <h2>Profile</h2>
      <p>profile page: {params.id}</p>
    </div>
  );
};

export default AccountProfile;
