"use server";
import Account from '../../models/Account';

interface AccountData {
  id?: number;
  schoolName: string;
  email: string;
  mobile: string;
  city: string;
  address: string;
  username: string;
  password: string;
  language: string;
  profileImage: string;
}
const createAccount = async (data: AccountData) => {
  try {
    if (!data.schoolName || !data.email || !data.mobile || !data.city || !data.address || !data.username || !data.password || !data.language || !data.profileImage) {
      throw new Error('Missing required fields');
    }
    const account = await Account.create({ ...data, id: undefined });
    if (!account) {
      throw new Error('Failed to create account');
    }
    return account.get({ plain: true }); // Convert the account instance to a plain object
  } catch (error) {
    console.error('Error creating account:', error);
    throw error;
  }
};

const updateAccount = async (id: number, data: Partial<AccountData>) => {
  try {
    const account = await Account.findOne({ where: { id } });
    if (!account) {
      throw new Error(`Account with id ${id} not found`);
    }

    await account.update(data);
    return account.get({ plain: true }); 
  } catch (error) {
    console.error('Error updating account:', error);
    throw error;
  }
};

const getAccount = async () => {
  try {
    const account = await Account.findOne({ where: { /* add conditions to fetch the desired account */ } });
    if (!account) {
      throw new Error('Account not found');
    }
    return account.get({ plain: true }); 
  } catch (error) {
    console.error('Error fetching account:', error);
    throw error;
  }
};

export { createAccount, updateAccount , getAccount};