import pool from "../model/db.js";

export const selectAllRewards = () => {
    const rewards = pool.query('SELECT * FROM rewards ORDER BY id');
    return rewards;
}

export const CheckDuplicateReward = (name:string) => {
    const reward = pool.query('SELECT * FROM rewards WHERE LOWER(name) = $1', [name]);
    return reward;
}

export const selectAllActiveRewards = () => {
    const rewards = pool.query('SELECT * FROM rewards WHERE status=$1 ORDER BY id', ['active']);
    return rewards;
}

export const selectRewardById = (id: number) => {
    const reward = pool.query('SELECT * FROM rewards WHERE id=$1', [id]);
    return reward;
}

export const insertReward = (name: string, points: number) => {
    pool.query("INSERT INTO rewards VALUES (DEFAULT,$1, $2,'active',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)", [name, points]);
}

export const changeReward = (id: number, name: string, points: number, status:string) => {
    pool.query('UPDATE rewards SET name=$1, points=$2, status=$3, updated_at = CURRENT_TIMESTAMP WHERE id=$4', [name, points, status,id]);
}
