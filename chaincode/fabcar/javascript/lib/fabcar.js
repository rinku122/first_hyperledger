/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

"use strict";

const { Contract } = require("fabric-contract-api");

class FabCar extends Contract {
    async initLedger(ctx) {
        await ctx.stub.putState("test", "hello world");
        return "success";
    }

    async writeData(ctx, key, value) {
        let jsonValue = JSON.parse(value);
        await ctx.stub.putState(key, Buffer.from(JSON.stringify(jsonValue)));
        return Buffer.from(JSON.stringify(jsonValue));
    }

    async readData(ctx, key) {
        var response = await ctx.stub.getState(key);
        response = response.toString("utf-8");
        return JSON.stringify(response);
    }
}

module.exports = FabCar;
