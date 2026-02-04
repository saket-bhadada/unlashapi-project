import React,{useState,useEffect} from "react";
import io from 'socket.io-client';

const socket = io.connect("httpt://localhost:3000");
