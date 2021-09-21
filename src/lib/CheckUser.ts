import AppError from '../error/AppError';

export default function checkUserId(data_id: string, user_id: string) {
  if (data_id != user_id) {
    throw new AppError('Unauthorized', 401);
  }
}
