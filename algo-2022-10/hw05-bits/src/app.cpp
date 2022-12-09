#include <stdio.h>
#include <iostream>


ulong getKingMoves(int pos);
void printMoves(std::string s, int pos, ulong moveMask, int bitsCount); //
int getBitsCount(ulong mask);

int main(void) {
    printMoves("kingMoves", 0, getKingMoves(0), getBitsCount(getKingMoves(0)));
    printMoves("kingMoves", 63, getKingMoves(63), getBitsCount(getKingMoves(63)));
    printMoves("kingMoves", 7, getKingMoves(7), getBitsCount(getKingMoves(7)));
    printMoves("kingMoves", 56, getKingMoves(56), getBitsCount(getKingMoves(56)));

    return 0;
}

ulong getKingMoves(int pos) {
    ulong K = 1UL << pos;
    ulong noA = 0xfefefefefefefefe;
    ulong noH = 0x7f7f7f7f7f7f7f7f;
    ulong Ka = K & noA;
    ulong Kh = K & noH;
    ulong mask = 
        (Ka << 7) | (K << 8) | (Kh << 9) |
        (Ka >> 1) |            (Kh << 1) | 
        (Ka >> 9) | (K >> 8) | (Kh >> 7);

    return mask;
}

void printMoves(std::string s, int pos, ulong moveMask, int bitsCount) {
    std::cout << s << "(" << pos << ") = moveMask(" << moveMask << ") bitsCount(" << bitsCount << ")" << std::endl;
}

int getBitsCount(ulong mask) {
    ulong curMask = mask;
    int bitsCount = 0;
    while (curMask > 0) {
        bool bitEnabled = (curMask & 1) == 1;
        if (bitEnabled) {
            bitsCount++;
        }
        curMask = curMask >> 1;
    }
    return bitsCount;
}
