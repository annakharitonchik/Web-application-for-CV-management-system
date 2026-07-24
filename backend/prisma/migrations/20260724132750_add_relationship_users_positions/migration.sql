-- CreateTable
CREATE TABLE "_PositionToUser" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_PositionToUser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_PositionToUser_B_index" ON "_PositionToUser"("B");

-- AddForeignKey
ALTER TABLE "_PositionToUser" ADD CONSTRAINT "_PositionToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Position"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PositionToUser" ADD CONSTRAINT "_PositionToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
