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
    const account = await Account.create({
      schoolName: data.schoolName,
      email: data.email,
      mobile: data.mobile,
      city: data.city,
      address: data.address,
      username: data.username,
      password: data.password,
      language: data.language,
      profileImage: data.profileImage,
    });
    return account.get({ plain: true });
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

// Add a check to ensure userId is set before calling getAccount
const getAccount = async (userId: number) => {
  console.log('Getting account with ID:', userId);
  try {
    const account = await Account.findOne({ where: { id: userId } });
    console.log('Account found:', account);
    if (!account) {
      console.log('Account not found, creating new account');
      const newAccount = await Account.create({
        id: userId,
        schoolName: 'Bhankid International Institute',
        email: 'admin@example.com',
        mobile: '1234567890',
        city: 'Accra',
        address: 'Greater-Accra',
        username: 'School Admin',
        password: 'default_password',
        language: 'English',
        profileImage: '/profile-picture.png',
      });
      return newAccount.get({ plain: true });
    }
    return account.get({ plain: true });
  } catch (error) {
    console.error('Error fetching account:', error);
    throw error;
  }
};

export { createAccount, updateAccount , getAccount};