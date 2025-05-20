export const skeletonType = ["title", "avatar"] as const;
export type SkeletonType = (typeof skeletonType)[number];

export const avatarShapeType = ["circle", "square"] as const;
export type AvatarShapeType = (typeof avatarShapeType)[number];
