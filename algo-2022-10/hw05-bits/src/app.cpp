#include <stdio.h>
#include <iostream>

ulong getKingMoves(int pos);
void printMoves(std::string s, int pos, ulong moveMask, int bitsCount);
int getBitsCount(ulong mask);
ulong getHorseMoves(ulong horses, int pos);
void printHorse(ulong horses, int pos);
void printKing(int pos);
int getBitsCountFaster(ulong mask);

int main(void) {
    printKing(0);
    printKing(63);
    printKing(7);
    printKing(56);
    
    printf("\n");

    printHorse(1UL, 0);
    printHorse(1UL, 7);
    printHorse(1UL, 56);
    printHorse(1UL, 63);

    return 0;
}

ulong noA = 0xfefefefefefefefe;
ulong noH = 0x7f7f7f7f7f7f7f7f;
ulong noG = 0xbfbfbfbfbfbfbfbf;
ulong noB = 0xfdfdfdfdfdfdfdfd;

ulong getHorseMoves(ulong horses, int pos) {
    ulong H = horses << pos;

    ulong a = H << 15;
    ulong b = H << 17;
    ulong c = H << 6;
    ulong d = H << 10;
    ulong e = H >> 10;
    ulong f = H >> 6;
    ulong g = H >> 17;
    ulong h = H >> 15;

    ulong mask = 
        ((c | e) & (noH & noG)) |
        ((a | g) & noH) |
        ((b | h) & noA) |
        ((d | f) & (noA & noB));

    return mask;
}

ulong getKingMoves(int pos) {
    ulong K = 1UL << pos;
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

void printHorse(ulong horses, int pos) {
    printMoves("horseMoves", pos, getHorseMoves(horses, pos), getBitsCountFaster(getHorseMoves(horses, pos)));
}

void printKing(int pos) {
    printMoves("kingMoves", pos, getKingMoves(pos), getBitsCountFaster(getKingMoves(pos)));
}

int getBitsCountFaster(ulong mask) {
    int bitsCount = 0;
    while (mask != 0)
    {
        mask &= (mask - 1);
        bitsCount ++;
    }
    return bitsCount;
}
