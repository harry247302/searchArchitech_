// app/components/VisitorFetcher.js
"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getVisitorById } from "@/app/redux/slices/visitorSlice/VisitorAuth";

export default function VisitorFetcher() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getVisitorById());
    }, [dispatch]);

    return null;
}
