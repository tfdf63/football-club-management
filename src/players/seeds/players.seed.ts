import { DataSource } from 'typeorm';
import { Player } from '../entities/player.entity';
import { PlayerPosition } from '../enums/player-position.enum';
import { PlayerFoot } from '../enums/player-foot.enum';
import { CountryEnum } from '../enums/country.enum';

export async function seedPlayers(dataSource: DataSource): Promise<void> {
  const playersRepository = dataSource.getRepository(Player);

  // Проверяем, есть ли уже данные
  const existingPlayers = await playersRepository.count();
  if (existingPlayers > 0) {
    console.log('Players already seeded, skipping...');
    return;
  }

  const playersData = [
    {
      fullName: 'Lionel Messi',
      dateOfBirth: new Date('1987-06-24'),
      transfermarktLink:
        'https://www.transfermarkt.com/lionel-messi/profil/spieler/28003',
      photoUrl: 'https://example.com/messi.jpg',
      country: CountryEnum.ARGENTINA,
      city: 'Rosario',
      league: 'Major League Soccer',
      club: 'Inter Miami',
      youthAcademy: "Newell's Old Boys",
      mainPosition: PlayerPosition.CF,
      position2: PlayerPosition.RW,
      position3: PlayerPosition.CAM,
      height: 170,
      weight: 72,
      foot: PlayerFoot.LEFT,
      contractExpires: new Date('2025-12-31'),
      currentLevel: 9,
      potential: 9,
      shortlist: true,
    },
    {
      fullName: 'Kylian Mbappé',
      dateOfBirth: new Date('1998-12-20'),
      transfermarktLink:
        'https://www.transfermarkt.com/kylian-mbappe/profil/spieler/342229',
      photoUrl: 'https://example.com/mbappe.jpg',
      country: CountryEnum.FRANCE,
      city: 'Paris',
      league: 'Ligue 1',
      club: 'Paris Saint-Germain',
      youthAcademy: 'AS Bondy',
      mainPosition: PlayerPosition.CF,
      position2: PlayerPosition.SS,
      position3: PlayerPosition.LW,
      height: 178,
      weight: 73,
      foot: PlayerFoot.RIGHT,
      contractExpires: new Date('2024-06-30'),
      currentLevel: 9,
      potential: 10,
      shortlist: true,
    },
    {
      fullName: 'Virgil van Dijk',
      dateOfBirth: new Date('1991-07-08'),
      transfermarktLink:
        'https://www.transfermarkt.com/virgil-van-dijk/profil/spieler/139590',
      photoUrl: 'https://example.com/vandijk.jpg',
      country: CountryEnum.NETHERLANDS,
      city: 'Breda',
      league: 'Premier League',
      club: 'Liverpool',
      youthAcademy: 'Willem II',
      mainPosition: PlayerPosition.CB,
      position2: null,
      position3: null,
      height: 193,
      weight: 92,
      foot: PlayerFoot.RIGHT,
      contractExpires: new Date('2025-06-30'),
      currentLevel: 8,
      potential: 8,
      shortlist: false,
    },
    {
      fullName: 'Kevin De Bruyne',
      dateOfBirth: new Date('1991-06-28'),
      transfermarktLink:
        'https://www.transfermarkt.com/kevin-de-bruyne/profil/spieler/88755',
      photoUrl: 'https://example.com/debruyne.jpg',
      country: CountryEnum.BELGIUM,
      city: 'Drongen',
      league: 'Premier League',
      club: 'Manchester City',
      youthAcademy: 'KRC Genk',
      mainPosition: PlayerPosition.CAM,
      position2: PlayerPosition.CM,
      position3: null,
      height: 181,
      weight: 70,
      foot: PlayerFoot.RIGHT,
      contractExpires: new Date('2025-06-30'),
      currentLevel: 9,
      potential: 9,
      shortlist: true,
    },
    {
      fullName: 'Alisson Becker',
      dateOfBirth: new Date('1992-10-02'),
      transfermarktLink:
        'https://www.transfermarkt.com/alisson/profil/spieler/121895',
      photoUrl: 'https://example.com/alisson.jpg',
      country: CountryEnum.BRAZIL,
      city: 'Novo Hamburgo',
      league: 'Premier League',
      club: 'Liverpool',
      youthAcademy: 'Internacional',
      mainPosition: PlayerPosition.GK,
      position2: null,
      position3: null,
      height: 191,
      weight: 91,
      foot: PlayerFoot.RIGHT,
      contractExpires: new Date('2027-06-30'),
      currentLevel: 9,
      potential: 9,
      shortlist: false,
    },
  ];

  const players = playersRepository.create(playersData);
  await playersRepository.save(players);

  console.log(`Seeded ${players.length} players`);
}
