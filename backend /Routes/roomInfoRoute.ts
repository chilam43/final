import express from "express";
import { RoomInfoService } from "../services/roomInfoServices";
import { knex } from "../db";
import { RommInfoController } from "../controllers/roomInfoController";

export let roomInfoRoute = express.Router();

export const roomInfoService = new RoomInfoService(knex);
export const roomInfoController = new RommInfoController(roomInfoService);

roomInfoRoute.get("/loadRoomInfo", roomInfoController.getRoomInfo);
