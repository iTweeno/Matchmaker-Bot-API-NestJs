import { Types, SchemaTypes } from "mongoose";
import { Prop } from "@nestjs/mongoose";

export class Base {
	@Prop({ type: SchemaTypes.ObjectId })
	_id: Types.ObjectId;
}
