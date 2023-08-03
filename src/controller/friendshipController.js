/* eslint-disable max-len */
/* eslint-disable consistent-return */
/* eslint-disable import/extensions */
import response from '../helper/response.js';
import AppError from '../helper/AppError.js';
import USerServicies from '../database/services/userservicies.js';
import friendshipService from '../database/services/friendshipService.js';

class friendship {
  static async friendRequest(req, res, next) {
    try {
      const senderId = req.user.id;
      const receiverId = req.params.id;
      const sender = await USerServicies.findUserById(senderId);
      const receiver = await USerServicies.findUserById(receiverId);
      if (!sender || !receiver) return next(new AppError(404, 'Not found', 'User is not found.'));

      // Check if a friend request between the users already exists
      if (sender.sentFriendRequests.includes(receiverId) || receiver.receivedFriendRequests.includes(senderId)) {
        return next(new AppError(400, 'Bad requet', 'Friend request already sent'));
      }
      sender.sentFriendRequests.push(receiverId);
      receiver.receivedFriendRequests.push(senderId);
      await Promise.all([sender.save(), receiver.save()]);
      await friendshipService.createFreindship(senderId, receiverId);
      response(res, 200, 'Friend requst sent successfully.');
    } catch (error) {
      next(new AppError(500, 'INTERNAL SERVER ERROR', error));
    }
  }

  static async acceptRejectFriendRequest(req, res, next) {
    try {
      const { reqID, action } = req.params;
      const userId = req.user.id;
      console.log(action)
      const friendRequest = await friendshipService.fidnById(reqID);
      if (!friendRequest || friendRequest.receiverId.toString() !== userId || friendRequest.status !== 'pending') {
        return res.status(404).json({ error: 'Friend request not found or not pending' });
      }
      if (action === 'accept') {
        friendRequest.status = 'accepted';
        await friendRequest.save();

        const sender = await USerServicies.findUserById(friendRequest.senderId);
        const receiver = await USerServicies.findUserById(friendRequest.receiverId);

        sender.friends.push(friendRequest.receiverId);
        receiver.friends.push(friendRequest.senderId);

        await Promise.all([sender.save(), receiver.save()]);

        return response(res, 200, 'Friend request accepted successfully');
      } if (action === 'reject') {
        friendRequest.status = 'rejected';
        await friendRequest.save();

        response(res, 200, 'Friend request rejected');
      }
      return res.status(400).json({ error: 'Invalid action' });
    } catch (error) {
      next(new AppError(500, 'INTERNAL SERVER ERROR', error));
    }
  }
}

export default friendship;
