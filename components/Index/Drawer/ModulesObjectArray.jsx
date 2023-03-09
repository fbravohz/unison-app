import React from "react";
import HomeIcon from '@mui/icons-material/Home';
import EmailIcon from '@mui/icons-material/Email';
import PeopleIcon from '@mui/icons-material/People';
import ContactsIcon from '@mui/icons-material/Contacts';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ArticleIcon from '@mui/icons-material/Article';
import SummarizeIcon from '@mui/icons-material/Summarize';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import AssessmentIcon from '@mui/icons-material/Assessment';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import EngineeringIcon from '@mui/icons-material/Engineering';

import BadgeIcon from '@mui/icons-material/Badge';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import HolidayVillageIcon from '@mui/icons-material/HolidayVillage';
const subUsuarios = [
  {label: 'Listado', icon: <BadgeIcon/>, route: 'users/listado'},
  {label: 'Vacaciones', icon: <HolidayVillageIcon/>, route: 'users/listado'},
  {label: 'Perfiles', icon: <ManageAccountsIcon/>, route: 'users/listado'},
];

['Listado', 'Vacaciones', 'Perfiles', 'Zonas', 'Puestos', 'Alertas']

const ModulesObjectArray = [
  {label: 'Inicio', icon: <HomeIcon/>},
  {label: 'E-mail', icon: <EmailIcon/>},
  {label: 'Usuarios', icon: <PeopleIcon/>, subitems: subUsuarios},
  {label: 'Clientes', icon: <ContactsIcon/>},
  {label: 'Demostraciones', icon: <ViewModuleIcon/>},
  {label: 'Informes semanales', icon: <ArticleIcon/>},
  {label: 'Informes directivos', icon: <SummarizeIcon/>},
  {label: 'Gastos', icon: <PointOfSaleIcon/>},
  {label: 'Reportes', icon: <AssessmentIcon/>},
  {label: 'Prospectos', icon: <BusinessCenterIcon/>},
  {label: 'Operación', icon: <EngineeringIcon/>},
];

module.exports = { ModulesObjectArray };