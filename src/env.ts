import { config } from 'dotenv';

config();

export default class Env {
  public static ENV = process.env.ENV || 'DEV';
  public static PORT = process.env.PORT || 3000;
  public static NOVU_SECRET_KEY = process.env.NOVU_SECRET_KEY || 'novu_secret_key';
  public static EXPO_PROJECT_ID = process.env.EXPO_PROJECT_ID || 'expo_project_id';
}