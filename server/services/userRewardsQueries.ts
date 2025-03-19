import pool from '../model/db.js';
export const inputReward = (user_id: number, reward_id: number, price_at_pruchase:number) => {
    pool.query('INSERT INTO redeemed_prizes (user_id,reward_id,redeem_date,price_at_purchase) VALUES($1, $2, CURRENT_TIMESTAMP, $3)', [user_id, reward_id,price_at_pruchase]);
  };
  
export const selectRewards = (user_id: number) => {
    const rewards = pool.query("SELECT redeemed_prizes.id,rewards.name, redeemed_prizes.price_at_purchase, redeem_date FROM redeemed_prizes JOIN rewards ON redeemed_prizes.reward_id = rewards.id WHERE redeemed_prizes.user_id = $1", [user_id]);;
    return rewards;
  };

export const selectPopularPrizesByUser = (user_id: number) => {
    const rewards = pool.query("SELECT rp.reward_id, r.name, \
      COUNT(rp.reward_id) AS redeemed_count FROM redeemed_prizes rp \
      JOIN rewards r ON rp.reward_id = r.id WHERE rp.user_id = $1 GROUP BY rp.reward_id,r.name ORDER BY redeemed_count DESC", [user_id]);;
    return rewards;
  }

export const selectPopularPrizes = () => {
    const rewards = pool.query("SELECT rp.reward_id,r.name, \
        COUNT(rp.reward_id) AS redeemed_count FROM redeemed_prizes rp \
        JOIN rewards r ON rp.reward_id = r.id GROUP BY rp.reward_id,r.name ORDER BY redeemed_count DESC");
    return rewards;
}

export const selectPopularPrizesByLocation = (location: string) => {
    const rewards = pool.query("SELECT rp.reward_id,r.name, \
        COUNT(rp.reward_id) AS redeemed_count FROM redeemed_prizes rp \
        JOIN rewards r ON rp.reward_id = r.id JOIN users u ON rp.user_id = u.id WHERE u.location = $1 GROUP BY rp.reward_id,r.name ORDER BY redeemed_count DESC", [location]);
    return rewards;
}