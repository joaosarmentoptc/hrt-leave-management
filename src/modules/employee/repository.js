const { User, LeaveRequest } = require("../../../models");

async function findUserByIdWithSubordinatesAndLeaves(userId) {
  const user = await User.findByPk(userId, {
    include: [
      {
        model: User,
        as: "subordinates",
        include: [
          {
            model: LeaveRequest,
            as: "leaves",
          },
        ],
      },
      {
        model: LeaveRequest,
        as: "leaves",
      },
    ],
  });
  if (!user) return null;

  const subordinates = await Promise.all(
    user.Subordinates.map(async (subordinate) => {
      const subordinateData = await findUserByIdWithSubordinatesAndLeaves(
        subordinate.id
      );
      return {
        user: subordinateData.user,
        leaves: subordinateData.leaves,
        subordinates: subordinateData.subordinates,
      };
    })
  );

  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      isAdmin: user.isAdmin,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    },
    leaves: user.Leaves,
    subordinates,
  };
}

function findUserById(userId) {
  return User.findByPk(userId);
}

function findUserByIdWithLeaves(userId) {
  return User.findByPk(userId, {
    include: [{ model: LeaveRequest, as: "leaves" }],
  });
}

async function isManager(userId, managerId) {
  const user = await User.findByPk(userId, {
    include: [{ model: User, as: "managers" }],
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user.managers.some((manager) => manager.id === managerId);
}

module.exports = {
  findUserByIdWithSubordinatesAndLeaves,
  findUserById,
  findUserByIdWithLeaves,
  isManager,
};
