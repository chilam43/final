import express from "express";
import { RoomInfoService } from "../services/roomInfoServices";
import { knex } from "../db";
import { RommInfoController } from "../controllers/roomInfoController";

export let roomInfoRoute = express.Router();

export const roomInfoService = new RoomInfoService(knex);
export const roomInfoController = new RommInfoController(roomInfoService);

roomInfoRoute.post("/A", roomInfoController.setRoomInfo);
roomInfoRoute.post("/B", roomInfoController.setRoomInfo);
roomInfoRoute.post("/C", roomInfoController.setRoomInfo);
roomInfoRoute.post("/D", roomInfoController.setRoomInfo);
roomInfoRoute.post("/bookingRoom", roomInfoController.bookingRoom);
roomInfoRoute.post("/roomAva", roomInfoController.searchAvailableRoom);
